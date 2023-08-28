'use client'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div className='flex h-screen items-center justify-center bg-green-400'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl'>blog</h1>
        <button
          type='button'
          onClick={() => router.push('/blog/1-2-3-1')}
          className='mt-4 rounded bg-red-100 px-2 text-gray-600 hover:bg-red-200 hover:text-gray-800'
        >
          blog
        </button>
      </div>
    </div>
  )
}
