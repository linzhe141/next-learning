'use client'
import Underline from '@/components/underline'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div className='flex h-screen items-center justify-center bg-green-400'>
      <div className='flex flex-col items-center justify-center'>
        <Underline height={8}>
          <h1
            className='mb-4 cursor-pointer text-9xl'
            onClick={() => router.push('/blog/1-2-3-1')}
          >
            blog
          </h1>
        </Underline>
      </div>
    </div>
  )
}
