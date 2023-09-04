'use client'
import Nav from '@/components/layout/nav'
import ReadmeDir from '@/components/readmeDir'
import Content from '@/components/layout/content'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Icon from '../icon/Icon'
import Image from 'next/image'
import Underline from '../underline'
import { useStore } from '@/store/store'
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [showNav, setShowNav] = useState(false)
  const navList = useStore((state) => state.navList)
  const pathname = usePathname()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNav])
  return (
    <main className='flex h-screen flex-col'>
      <div className='flex items-center justify-between border-b-[1px] p-4'>
        <div>
          <Underline>
            <div
              className=' flex items-center'
              onClick={() => router.push('/')}
            >
              <Image
                className='mr-2'
                width={24}
                height={24}
                src={'/logo.jpg'}
                alt='logo'
              />
              <span>linzhe-blog</span>
            </div>
          </Underline>
        </div>

        <div>
          <Underline>
            <span onClick={() => router.push('/')}>home</span>
          </Underline>
        </div>
      </div>
      <div className='flex h-10 items-center overflow-hidden border-b-[1px] px-2 xl:h-0 xl:border-b-0'>
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
          className={`fixed bottom-0 top-0 z-[1] overflow-auto border-r-[1px] bg-white xl:static xl:min-w-[300px] xl:px-[50px] ${
            showNav ? 'left-0 right-0' : 'left-[-300px] '
          } transition-[left] duration-300`}
        >
          <div className='flex flex-row-reverse px-4 py-2 xl:hidden'>
            <div
              onClick={closeNav}
              className='cursor-pointer rounded-full p-1 transition-all duration-200 hover:rotate-90 hover:bg-green-100 hover:text-green-400'
            >
              <Icon type='close' />
            </div>
          </div>
          <div className='mb-4 hidden xl:block'></div>
          <Nav beforeJump={beforeJumpHandle} data={navList} />
        </div>
        <div className='flex-1 overflow-auto p-5 xl:pr-[300px]'>
          <Content>{children}</Content>
        </div>
        <div
          className={`hidden bg-white xl:fixed xl:bottom-0 xl:right-[20px] xl:top-[57px] xl:block xl:w-[280px] xl:border-l-[1px] xl:px-[50px]`}
        >
          <div className='mb-4 hidden xl:block'></div>
          <ReadmeDir url={pathname} />
        </div>
      </div>
    </main>
  )
}
