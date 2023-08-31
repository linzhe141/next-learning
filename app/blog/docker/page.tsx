'use client'
import Blog from '@/components/Blog'
import Readme from './readme.mdx'

export default function Page() {
  console.log(require('./readme.mdx').default())
  return (
    <div>
      <Blog>
        <Readme />
      </Blog>
    </div>
  )
}
