import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { NavItemProps } from "./types";
export default function NavItem(props: NavItemProps) {
  const { label, url, level, children, expanded, expandChangeHandle, navList } =
    props;
  // const [subNavheight, setSubNavHeight] = useState(getHeight() * 40);
  const subNavheight = getHeight() * 40
  const router = useRouter();
  function findNav(data: any[]) {
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
    const target = findNav(navList);
    if (!target) return 0;
    const foo = (data, result = []) => {
      for (const item of data) {
        if (item.expanded) {
          result.push(item);
        }
        if (Array.isArray(item.children)) {
          foo(item.children, result);
        }
      }
      return result;
    };
    const x = foo(target.children ?? []).reduce(
      (sum, item) => (sum += item.children.length),
      0
    );

    return x + (target.children?.length ?? 0);
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
        className="pr-4 hover:bg-green-200 cursor-pointer leading-10 flex justify-between"
        style={{ paddingLeft: 16 * level + "px" }}
        onClick={() => clickHandler()}
      >
        <div>{label}</div>
        {/* <div>{(children?.length ?? 0) > 0 ? "+" : ""}</div> */}
        <div>{children?.length && (!expanded ? "+" : "-")}</div>
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
