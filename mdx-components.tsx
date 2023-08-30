import type { MDXComponents } from 'mdx/types'

// This file is required to use MDX in `app :root` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}321</h1>,
    ...components,
  }
}
