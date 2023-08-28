export type NavItemProps = {
  label: string
  url: string
  level: number
  expanded: boolean
  expandChangeHandle?: (nav: NavItemProps) => void
  clickHandle?: (nav: NavItemProps) => void
  children?: NavItemProps[]
  navList?: NavItemProps[]
}
export type NavPros = {
  beforeJump?: (...args: any) => void
}
