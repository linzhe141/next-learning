import NavItem from './navItem'
import { useState, useEffect } from 'react'
import type { NavItemProps, NavPros } from './types'
import { usePathname, useRouter } from 'next/navigation'

export default function Nav({ beforeJump }: NavPros) {
  const pathname = usePathname()
  const router = useRouter()
  const menuData = [
    {
      label: 'test1',
      url: '/blog/1',
      expanded: false,
      level: 1,
      children: [
        { label: 'test1-1', url: '/blog/1-1', level: 2, expanded: false },
        {
          label: 'test1-2',
          url: '/blog/1-2',
          level: 2,
          expanded: false,
          children: [
            {
              label: 'test1-2-1',
              url: '/blog/1-2-1',
              level: 3,
              expanded: false,
            },
            {
              label: 'test1-2-2',
              url: '/blog/1-2-2',
              level: 3,
              expanded: false,
            },
            {
              label: 'test1-2-3',
              url: '/blog/1-2-3',
              level: 3,
              expanded: false,
              children: [
                {
                  label: 'test1-2-3-1',
                  url: '/blog/1-2-3-1',
                  level: 4,
                  expanded: false,
                },
              ],
            },
            {
              label: 'test1-2-4',
              url: '/blog/1-2-4',
              level: 3,
              expanded: false,
            },
          ],
        },
        { label: 'test1-3', url: '/blog/1-3', level: 2, expanded: false },
      ],
    },
    { label: 'test2', url: '/blog/2', level: 1, expanded: false },
    { label: 'test3', url: '/blog/3', level: 1, expanded: false },
  ]
  const [menuList, setMenuList] = useState(menuData)
  const expandChangeHandle = (nav: NavItemProps) => {
    function foo(data: any) {
      const temp: any = {}
      temp.label = data.label
      temp.url = data.url
      temp.level = data.level
      temp.expanded = data.expanded
      if (data.url === nav.url) {
        temp.expanded = !data.expanded
      }
      if (Array.isArray(data.children)) {
        temp.children = data.children.map(foo)
      }
      return temp
    }

    setMenuList(menuList.map(foo))
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
    // if (parentNode) parentNode.expanded = flag;
    return data
  }
  useEffect(() => {
    setMenuList(setDefaultData(JSON.parse(JSON.stringify(menuData))))
    // setMenuList(setDefaultData(menuData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {menuList.map((menu) => (
        <NavItem
          {...menu}
          key={menu.url}
          navList={menuList as NavItemProps[]}
          expandChangeHandle={expandChangeHandle}
          clickHandle={clickHandle}
        />
      ))}
    </div>
  )
}
