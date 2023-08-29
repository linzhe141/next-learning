'use client'
import Hello from './hello.mdx'
export default function Test({ params }: { params: { id: string } }) {
  return (
    <div className='prose max-w-full'>
      <div>My Post: {params.id}</div>
      {/* <div>test __dirname: {__dirname}</div> */}
      {/* <div>test __filename: {__filename}</div> */}
      <Hello />
    </div>
  )
}
