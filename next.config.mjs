import nextMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
/** @type {import('next').NextConfig} */
const nextConfig = {}
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
})
export default withMDX(nextConfig)
