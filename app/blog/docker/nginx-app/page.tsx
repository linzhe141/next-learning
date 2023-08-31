'use client'
import Blog from '@/components/Blog'
import Readme from './readme.mdx'

export default function Page() {
  return (
    <div>
      <Blog>
        <Readme />
      </Blog>
    </div>
  )
}
