import NavItem from "./navItem";
import { useState, useEffect } from "react";
import type { NavItemProps } from "./types";
import { usePathname } from "next/navigation";
type Props = {
  show: boolean
}
export default function Nav({show}:Props) {
  const pathname = usePathname();
  const menuData = [
    {
      label: "test1",
      url: "/test/1",
      expanded: false,
      level: 1,
      children: [
        { label: "test1-1", url: "/test/1-1", level: 2, expanded: false },
        {
          label: "test1-2",
          url: "/test/1-2",
          level: 2,
          expanded: false,
          children: [
            {
              label: "test1-2-1",
              url: "/test/1-2-1",
              level: 3,
              expanded: false,
            },
            {
              label: "test1-2-2",
              url: "/test/1-2-2",
              level: 3,
              expanded: false,
            },
            {
              label: "test1-2-3",
              url: "/test/1-2-3",
              level: 3,
              expanded: false,
              children: [
                {
                  label: "test1-2-3-1",
                  url: "/test/1-2-3-1",
                  level: 4,
                  expanded: false,
                },
              ],
            },
            {
              label: "test1-2-4",
              url: "/test/1-2-4",
              level: 3,
              expanded: false,
            },
          ],
        },
        { label: "test1-3", url: "/test/1-3", level: 2, expanded: false },
      ],
    },
    { label: "test2", url: "/test/2", level: 1, expanded: false },
    { label: "test3", url: "/test/3", level: 1, expanded: false },
  ];
  console.log(menuData);
  const [menuList, setMenuList] = useState(menuData);
  const expandChangeHandle = (nav: NavItemProps) => {
    function foo(data: any) {
      const temp: any = {};
      temp.label = data.label;
      temp.url = data.url;
      temp.level = data.level;
      temp.expanded = data.expanded;
      if (data.url === nav.url) {
        temp.expanded = !data.expanded;
      }
      if (Array.isArray(data.children)) {
        temp.children = data.children.map(foo);
      }
      return temp;
    }

    setMenuList(menuList.map(foo));
  };
  function setDefaultData(
    data: NavItemProps[],
    parentNode: NavItemProps | null = null
  ) {
    for (const item of data) {
      // 先进行递归，再从叶子节点一层层出来
      if (Array.isArray(item.children)) {
        setDefaultData(item.children, item);
      }
      if (item.url === pathname) {
        if (parentNode) {
          parentNode.expanded = true;
        }
      }
      if (item.children?.find((it) => it.expanded)) {
        item.expanded = true;
      }
    }
    // if (parentNode) parentNode.expanded = flag;
    return data;
  }
  useEffect(() => {
    setMenuList(setDefaultData(JSON.parse(JSON.stringify(menuData))));
    // setMenuList(setDefaultData(menuData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`lg:w-[200px] lg:static bg-green-300 overflow-auto sm:fixed sm:top-0 sm:w-[200px] sm:bottom-0 ${show ? 'sm:left-0':'sm:left-[-200px]'} w-0 transition-all duration-300`}>
      {menuList.map((menu) => (
        <NavItem
          {...menu}
          key={menu.url}
          navList={menuList as NavItemProps[]}
          expandChangeHandle={expandChangeHandle}
        />
      ))}
    </div>
  );
}
