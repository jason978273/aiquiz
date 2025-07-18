import { getAuthsession } from '@/lib/nextauth'
import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
import UserAccountNav from './UserAccountNav'
import { ThemeToggle } from './ThemeToggle'

const Navbar = async () => {
  const session = await getAuthsession()
  // console.log(session?.user)
  // if (session?.user) {
  //   return <pre>{JSON.stringify(session.user, null, 2)}</pre>
  // } else {
  //   return <div>Please log in</div>}
  return (
    <div className='fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2'>
      <div className = 'flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl'>
        <Link href={'/'} className='flex items-center gap-2'>
          <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-2 md:block dark:border-white'>
            AIQuiz
          </p>
        </Link>
        <div className="flex items-center">
          <div className="flex items-center">
            {/* user profile */}
            {session?.user ? (
              <UserAccountNav user = {session.user} />
            ) : (
            <SignInButton text = {"Sign In"}/>
          )
          }
        </div>
        <ThemeToggle className='ml-4'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar