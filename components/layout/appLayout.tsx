'use client'
import Nav from '@/components/layout/nav'
import Content from '@/components/layout/content'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Icon from '../icon/Icon'
import { getNavList } from './api'
import { NavData } from './types'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [showNav, setShowNav] = useState(false)
  const [navList, setNavList] = useState<NavData[]>([])
  async function init() {
    const data = await getNavList()
    setNavList(formatNavList(data))
  }
  function formatNavList(data: NavData[], level = 1) {
    for (const item of data) {
      item.level = level
      item.expanded = false
      if (item.children) {
        formatNavList(item.children, item.level + 1)
      }
    }
    return data
  }
  function closeNav() {
    if (showNav) {
      setShowNav(false)
    }
  }
  function resizeHandle() {
    closeNav()
  }
  function beforeJumpHandle() {
    closeNav()
  }
  function keydownHandle(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeNav()
    }
  }
  useEffect(() => {
    window.addEventListener('resize', resizeHandle)
    window.addEventListener('keydown', keydownHandle)
    return () => {
      window.removeEventListener('resize', resizeHandle)
      window.removeEventListener('keydown', keydownHandle)
    }
  }, [showNav])
  useEffect(() => {
    init()
  }, [])
  return (
    <main className='flex h-screen flex-col'>
      <div className='flex h-10 items-center justify-between border-b-[1px] px-2'>
        <span>linzhe-blog</span>
        <button
          type='button'
          onClick={() => router.push('/')}
          className=' rounded bg-red-100 px-2 text-gray-600 hover:bg-red-200 hover:text-gray-800'
        >
          home
        </button>
      </div>
      <div className='flex h-10 items-center overflow-hidden border-b-[1px] px-2 lg:h-0 lg:border-b-0'>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowNav(true)}
        >
          <Icon type='menu' />
          <span className='ml-2'>Menu</span>
        </div>
      </div>
      <div className='flex h-0 flex-1 overflow-auto'>
        <div
          className={`fixed bottom-0 top-0  overflow-auto border-r-[1px] bg-white lg:static lg:w-[200px] ${
            showNav ? 'left-0 right-0' : 'left-[-200px]'
          } transition-[left] duration-300`}
        >
          <div className='flex flex-row-reverse px-4 py-2 lg:hidden'>
            <div
              onClick={closeNav}
              className='cursor-pointer rounded-full p-1 transition-all duration-200 hover:rotate-90 hover:bg-slate-100'
            >
              <Icon type='close' />
            </div>
          </div>
          <Nav beforeJump={beforeJumpHandle} data={navList} />
        </div>
        <Content>{children}</Content>
      </div>
    </main>
  )
}
