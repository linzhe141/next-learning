import NavItem from "./navItem";
import { useState } from "react";
import type { NavItemProps, NavList } from "./types";

export default function Nav() {
  const [menuList, setMenuList] = useState<NavList[]>([
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
  ]);
  // for (let i = 1; i <= 100; i++) {
  //   menuList.push({ label: "test" + i, url: "/test" + i, level: 1 });
  // }

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
    console.log(menuList.map(foo));
  };
  return (
    <div className="w-50 bg-green-300 overflow-auto">
      {menuList.map((menu) => (
        <NavItem
          {...menu}
          key={menu.url}
          navList={menuList}
          expandChangeHandle={expandChangeHandle}
        />
      ))}
    </div>
  );
}
