'use client'
import Blog from '@/components/Blog'
import Readme from './readme.mdx'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>My Post: {params.id}</div>
      {/* <div>test __dirname: {__dirname}</div> */}
      {/* <div>test __filename: {__filename}</div> */}
      <Blog>
        <Readme />
      </Blog>
    </div>
  )
}
