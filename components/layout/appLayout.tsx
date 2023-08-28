'use client'
import Nav from '@/components/layout/nav'
import Content from '@/components/layout/content'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [showNav, setShowNav] = useState(false)
  function resizeHandle() {
    setShowNav(false)
  }
  function beforeJumpHandle() {
    if (showNav) {
      setShowNav(false)
    }
  }
  function keydownHandle(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (showNav) {
        setShowNav(false)
      }
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
  return (
    <main className='flex h-screen flex-col'>
      <div className='flex h-10 items-center justify-between bg-gray-500 px-2 '>
        <span>linzhe-blog</span>
        <button
          type='button'
          onClick={() => router.push('/')}
          className=' rounded bg-red-100 px-2 text-gray-600 hover:bg-red-200 hover:text-gray-800'
        >
          home
        </button>
      </div>
      <div className='flex h-10 items-center overflow-hidden border-y-[1px] px-2 lg:h-0 lg:border-y-0'>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowNav(true)}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <rect x='2' y='7' width='11' height='2' fill='#606266'></rect>
            <rect x='2' y='11' width='14' height='2' fill='#606266'></rect>
            <rect x='2' y='15' width='8' height='2' fill='#606266'></rect>
            <rect x='2' y='3' width='16' height='2' fill='#606266'></rect>
          </svg>
          <span className='ml-2'>Menu</span>
        </div>
        {/* <div
          onClick={() => setShowNav(false)}
          className={`bottom-0 left-0 right-0 top-0 cursor-pointer transition-all duration-300 ${
            showNav ? 'fixed bg-gray-400 bg-opacity-60' : 'static'
          }`}
        ></div> */}
      </div>
      <div className='flex h-0 flex-1 overflow-auto'>
        <div
          className={`fixed bottom-0 top-0  overflow-auto bg-green-300 lg:static lg:w-[200px] ${
            showNav ? 'left-0 right-0' : 'left-[-200px]'
          } transition-[left] duration-300`}
        >
          <Nav beforeJump={beforeJumpHandle} />
        </div>
        <Content>{children}</Content>
      </div>
    </main>
  )
}
