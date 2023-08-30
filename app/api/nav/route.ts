import fs from 'fs-extra'
import path from 'path'
import { NextResponse } from 'next/server'
const blogDirName = 'blog'
// async function getBlogUrlList(
//   dir: string,
//   result: any[] = [],
//   parent: any = null
// ) {
//   for (const file of await fs.readdir(dir)) {
//     const fileStat = await fs.stat(path.resolve(dir, file))
//     let item: any = null
//     if (fileStat.isDirectory()) {
//       item = { label: file, children: [] }
//       if (parent) {
//         parent.children.push(item)
//       }
//       if ((await fs.readdir(path.resolve(dir, file))).includes('page.tsx')) {
//         let url
//         if (parent) {
//           url = `${parent.url}/${file}`
//         } else {
//           url = `${file}`
//         }
//         item.url = url
//         result.push(item)
//       }
//       await getBlogUrlList(path.resolve(dir, file), result, item)
//     }
//   }
//   return result
// }
async function getBlogUrlList(
  dir: string,
  result: any[] = [],
  parent: any = null
) {
  for (const name of await fs.readdir(dir)) {
    const fileStat = await fs.stat(path.resolve(dir, name))

    let item: any = { label: name, url: name }
    if (parent) {
      item.url = parent.url + '/' + name
      parent.children.push(item)
    } else {
      result.push(item)
    }

    // if (name === 'page.tsx') {
    //   if (parent) {
    //     item.url = parent.url
    //     item.label = parent.label
    //     parent.children.push(item)
    //   } else {
    //     item.url = ''
    //     item.label = ''
    //     result.push(item)
    //   }
    // }
    if (fileStat.isDirectory()) {
      Object.assign(item, { children: [] })
      await getBlogUrlList(path.resolve(dir, name), result, item)
    }
  }
  return result
}

export async function GET(request: Request) {
  const blogPath = path.resolve(process.cwd(), 'app/' + blogDirName)
  const result = await getBlogUrlList(blogPath)
  return NextResponse.json({ data: result })
}
