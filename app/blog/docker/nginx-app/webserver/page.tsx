'use client'
import Blog from '@/components/Blog'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>My Post: {params.id}</div>
      {/* <div>test __dirname: {__dirname}</div> */}
      {/* <div>test __filename: {__filename}</div> */}
    </div>
  )
}
