'use client'
import { getNavList } from '@/app/api'
import { usePathname } from 'next/navigation'
import AppLayout from '@/components/layout/appLayout'
import { useEffect } from 'react'
import { useStore } from '@/store/store'
const otherLayoutList = ['/']
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setNavList = useStore((state) => state.setNavList)

  async function init() {
    const data = await getNavList()
    setNavList(data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return otherLayoutList.includes(pathname) ? (
    children
  ) : (
    <AppLayout>{children}</AppLayout>
  )
}
