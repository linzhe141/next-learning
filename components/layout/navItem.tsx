import { usePathname } from 'next/navigation'
import { NavItemProps } from './types'
import Icon from '../icon/Icon'

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
      if (Array.isArray(item.children)) {
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
        if (Array.isArray(item.children)) {
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
  const clickHandler = () => {
    if (children?.length) {
      expandChangeHandle && expandChangeHandle(props)
    } else {
      clickHandle && clickHandle(props)
    }
  }
  return (
    <div className=''>
      <div
        className={`flex cursor-pointer items-center justify-between pr-4 leading-10 hover:bg-green-200 ${
          pathname === url ? 'text-green-400' : ''
        } transition-all duration-300`}
        style={{ paddingLeft: 16 * level + 'px' }}
        onClick={() => clickHandler()}
      >
        <div>{label}</div>
        <div>
          {children?.length && (
            <div
              className={`transition-all duration-300 ${
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
