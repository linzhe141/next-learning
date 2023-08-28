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
export type NavData = {
  label: string
  url: string
  level?: number
  expanded?: boolean
  children?: NavData[]
}
export type NavPros = {
  data: NavData[]
  beforeJump?: (...args: any) => void
}
