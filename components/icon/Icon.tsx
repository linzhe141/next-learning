const iconMap = {
  close: (
    <svg width={24} height={24} viewBox='0 0 24 24'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793Z'
      ></path>
    </svg>
  ),
  menu: (
    <svg width={20} height={20} viewBox='0 0 20 20'>
      <rect x='2' y='7' width='11' height='2' fill='#606266'></rect>
      <rect x='2' y='11' width='14' height='2' fill='#606266'></rect>
      <rect x='2' y='15' width='8' height='2' fill='#606266'></rect>
      <rect x='2' y='3' width='16' height='2' fill='#606266'></rect>
    </svg>
  ),
  triangle: (
    <svg width={12} height={12} viewBox='0 0 24 24'>
      <path d='M8 4v16l8-8z' />
    </svg>
  ),
}
type Props = {
  type: keyof typeof iconMap
}
export default function Icon({ type }: Props) {
  return <div>{iconMap[type]}</div>
}
