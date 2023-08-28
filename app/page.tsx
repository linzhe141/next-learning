'use client'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div className='flex h-screen items-center justify-center bg-green-400'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-9xl cursor-pointer' onClick={() => router.push('/blog/1-2-3-1')}>
          blog
        </h1>
      </div>
    </div>
  )
}
