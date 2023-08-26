import NavItem from "./navItem";
export default function Nav() {
  const menuList = [
    // {
    //   label: "test1",
    //   url: "/test1",
    //   level: 1,
    //   children: [{ label: "test1-1", url: "/test1-1", level: 2 }],
    // },
    // { label: "test2", url: "/test2", level: 1 },
    // { label: "test3", url: "/test3", level: 1 },
  ];
  for (let i = 1; i <= 100; i++) {
    menuList.push({ label: "test" + i, url: "/test" + i, level: 1 });
  }
  return (
    <div className="w-40 bg-green-300 overflow-auto">
      {menuList.map((menu) => (
        <NavItem {...menu} key={menu.url} />
      ))}
    </div>
  );
}
