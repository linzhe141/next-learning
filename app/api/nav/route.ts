import fs from 'fs-extra'
import path from 'path'
import { NextResponse } from 'next/server'
async function getBlogUrlList(
  dir: string,
  result: any[] = [],
  parentName: string = ''
) {
  for (const file of await fs.readdir(dir)) {
    const fileStat = await fs.stat(path.resolve(dir, file))
    if (fileStat.isDirectory()) {
      if ((await fs.readdir(path.resolve(dir, file))).includes('page.tsx')) {
        result.push({
          label: file,
          url: `/blog/${parentName ? '/' + parentName + '/' + file : file}`,
        })
      }
      await getBlogUrlList(path.resolve(dir, file), result, file)
    }
  }
  return result
}

export async function GET(request: Request) {
  const blogPath = path.resolve(process.cwd(), 'app/blog')
  const result = await getBlogUrlList(blogPath)
  return NextResponse.json({ data: result })
}
