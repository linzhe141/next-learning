import { useRouter, usePathname } from "next/navigation";
import { NavItemProps } from "./types";
const Icon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24">
    <path d="M8 4v16l8-8z" />
  </svg>
);
export default function NavItem(props: NavItemProps) {
  const { label, url, level, children, expanded, expandChangeHandle, navList } =
    props;
  const router = useRouter();
  const pathname = usePathname();
  const subNavheight = getHeight() * 40;
  function findNav(data: NavItemProps[]): NavItemProps | null {
    for (const item of data) {
      if (item.url === url) {
        return item;
      }
      if (Array.isArray(item.children)) {
        const target = findNav(item.children);
        if (target) return target;
      }
    }
    return null;
  }
  function getHeight() {
    const target = findNav(navList!);
    if (!target) return 0;
    const getExpandedItems = (
      data: NavItemProps[],
      result: NavItemProps[] = []
    ) => {
      for (const item of data) {
        if (item.expanded) {
          result.push(item);
        }
        if (Array.isArray(item.children)) {
          getExpandedItems(item.children, result);
        }
      }
      return result;
    };
    const allExpanded = getExpandedItems(
      (target.children ?? []).filter((item) => item.expanded)
    ).reduce((sum, item) => (sum += item.children?.length ?? 0), 0);

    return allExpanded + (target.children?.length ?? 0);
  }
  const clickHandler = () => {
    if (children?.length) {
      //
      // setIsExpanded(!isExpanded);
      expandChangeHandle && expandChangeHandle(props);
      // setSubNavHeight(getHeight() * 40);
    } else {
      router.push(url);
    }
  };
  return (
    <div className="">
      <div
        className={`pr-4 hover:bg-green-200 cursor-pointer leading-10 flex justify-between items-center ${
          pathname === url ? "text-orange-300" : "text-black"
        } transition-all duration-300`}
        style={{ paddingLeft: 16 * level + "px" }}
        onClick={() => clickHandler()}
      >
        <div>{label}</div>
        {/* <div>{(children?.length ?? 0) > 0 ? "+" : ""}</div> */}
        <div>
          {children?.length && (
            <div
              className={`transition-all duration-300 ${
                expanded ? "rotate-90" : ""
              }`}
            >
              <Icon />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          height: (expanded ? subNavheight : 0) + "px",
          // height: expanded ? "auto" : "0px",
        }}
        className={`overflow-hidden transition-all duration-300`}
      >
        {children?.map((subNav) => (
          <NavItem
            {...subNav}
            key={subNav.url}
            navList={navList}
            expandChangeHandle={expandChangeHandle}
          />
        ))}
      </div>
    </div>
  );
}
