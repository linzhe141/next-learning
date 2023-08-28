export default function Content({ children }: { children?: React.ReactNode }) {
  return (
    <div className='flex-1 overflow-auto'>
      <div className=' m-2 rounded bg-gray-100 p-2'>{children}</div>
    </div>
  )
}
