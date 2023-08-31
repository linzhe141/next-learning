import { usePathname } from 'next/navigation'
import { NavItemProps } from './types'
import Icon from '../icon/Icon'
import Underline from '../underline'

export default function NavItem(props: NavItemProps) {
  const {
    label,
    url,
    level,
    children,
    expanded,
    expandChangeHandle,
    clickHandle,
    navList,
  } = props
  const pathname = usePathname()
  const subNavheight = getExpandCount() * 40
  function findNav(data: NavItemProps[]): NavItemProps | null {
    for (const item of data) {
      if (item.url === url) {
        return item
      }
      if (item.children) {
        const target = findNav(item.children)
        if (target) return target
      }
    }
    return null
  }
  function getExpandCount() {
    const target = findNav(navList!)
    if (!target) return 0
    const getExpandedItems = (
      data: NavItemProps[],
      result: NavItemProps[] = []
    ) => {
      for (const item of data) {
        if (item.expanded) {
          result.push(item)
        }
        if (item.children) {
          getExpandedItems(item.children, result)
        }
      }
      return result
    }
    const allExpanded = getExpandedItems(
      (target.children ?? []).filter((item) => item.expanded)
    ).reduce((sum, item) => (sum += item.children?.length ?? 0), 0)

    return allExpanded + (target.children?.length ?? 0)
  }
  function clickHandler() {
    clickHandle && clickHandle(props)
  }
  return (
    <div className=''>
      <div
        className={`flex cursor-pointer items-center justify-between pr-4 leading-10 ${
          pathname === url ? 'text-green-400' : ''
        } transition-all duration-300`}
        style={{ paddingLeft: 16 * level + 'px' }}
        onClick={() => clickHandler()}
      >
        <Underline offset={-8}>
          <div>{label}</div>
        </Underline>
        <div>
          {(children?.length ?? 0) > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation()
                expandChangeHandle && expandChangeHandle(props)
              }}
              className={`flex h-4 w-4 items-center justify-center p-4 text-green-400 transition-all duration-300 ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              <Icon type='triangle' />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          height: (expanded ? subNavheight : 0) + 'px',
        }}
        className={`overflow-hidden transition-all duration-300`}
      >
        {children?.map((subNav) => (
          <NavItem
            {...subNav}
            key={subNav.url}
            navList={navList}
            expandChangeHandle={expandChangeHandle}
            clickHandle={clickHandle}
          />
        ))}
      </div>
    </div>
  )
}
