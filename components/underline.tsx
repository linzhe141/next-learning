export default function Underline({
  children,
  height = 4,
}: {
  children: React.ReactNode
  height?: number
}) {
  return (
    <div className='group w-full cursor-pointer'>
      {children}
      <div
        style={{ height: height + 'px' }}
        className={`mt-1 w-0 bg-gradient-to-r from-green-400 to-white transition-all duration-300 group-hover:w-full`}
      ></div>
    </div>
  )
}
