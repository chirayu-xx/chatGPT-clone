'use client'
import {signIn} from 'next-auth/react'
import Image from 'next/image'
import { AiFillGithub } from 'react-icons/ai'


function Login() {
  return (
    <div className='bg-[#343541] h-screen flex flex-col items-center justify-center text-center'>
      <Image
      src='https://links.papareact.com/2i6'
      width={300}
      height={300}
      alt='logo'
      />
      <div onClick={() => signIn('google',{callbackUrl:'/'})} className='flex hover:bg-gray-700 border space-x-2 px-10 p-2 m-2 rounded-lg gap-2'> 
      <button  className='text-white font-bold text-lg '>Sign In with Google</button>
      <Image src={'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'}width={28} height={20} alt='google'/>
      </div>
      <div onClick={() => signIn('github',{callbackUrl:'/'})} className='flex hover:bg-gray-700 border space-x-2 px-10 p-2 m-2 rounded-lg gap-2'> 
      <button  className='text-white font-bold text-lg '>Sign In with Github</button>
      <AiFillGithub className='w-10 h-7'/>
      </div>
    </div>
  )
}

export default Login
