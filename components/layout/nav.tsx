import NavItem from './navItem'
import { useState, useEffect } from 'react'
import type { NavItemProps, NavPros } from './types'
import { usePathname, useRouter } from 'next/navigation'

export default function Nav({ beforeJump, data }: NavPros) {
  const pathname = usePathname()
  const router = useRouter()
  const [navList, setNavList] = useState(data as unknown as NavItemProps[])
  const expandChangeHandle = (nav: NavItemProps) => {
    // TODO 使用useImmer
    function setExpanded(data: any) {
      const result: any = {}
      result.label = data.label
      result.url = data.url
      result.level = data.level
      result.expanded = data.expanded
      if (data.url === nav.url) {
        result.expanded = !data.expanded
      }
      if (Array.isArray(data.children)) {
        result.children = data.children.map(setExpanded)
      }
      return result
    }

    setNavList(navList.map(setExpanded))
  }
  const clickHandle = (nav: NavItemProps) => {
    router.push(nav.url)
    beforeJump && beforeJump()
  }
  function setDefaultData(
    data: NavItemProps[],
    parentNode: NavItemProps | null = null
  ) {
    for (const item of data) {
      // 先进行递归，再从叶子节点一层层出来
      if (Array.isArray(item.children)) {
        setDefaultData(item.children, item)
      }
      if (item.url === pathname) {
        if (parentNode) {
          parentNode.expanded = true
        }
      }
      if (item.children?.find((it) => it.expanded)) {
        item.expanded = true
      }
    }
    return data
  }

  useEffect(() => {
    setNavList(setDefaultData(data as unknown as NavItemProps[]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      {navList.map((nav) => (
        <NavItem
          {...nav}
          key={nav.url}
          navList={navList as NavItemProps[]}
          expandChangeHandle={expandChangeHandle}
          clickHandle={clickHandle}
        />
      ))}
    </div>
  )
}
