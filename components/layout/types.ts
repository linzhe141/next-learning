export type NavItemProps = {
  label: string;
  url: string;
  level: number;
  expanded: boolean;
  expandChangeHandle?: (nav: NavItemProps) => void;
  children?: NavItemProps[];
  navList:NavList[]
};
export type NavList = {
label: string;
  url: string;
  level: number;
  expanded: boolean;
  children?: NavList[];
}