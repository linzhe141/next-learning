'use client'
import Hello from './hello.mdx'
export default function Test({ params }: { params: { id: string } }) {
  return (
    <div className='prose w-full'>
      <Hello />
      <div>My Post: {params.id}</div>
    </div>
  )
}
