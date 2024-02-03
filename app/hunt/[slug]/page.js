'use client'
import React, { useState } from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import Link from 'next/link';
import { CiCircleQuestion } from "react-icons/ci";

const page = () => {
    const [active, setactive] = useState('home')

  return (
    <div className='w-full bg-black text-white h-screen flex flex-col'>
            <div className='h-[90%] flex flex-col items-center '>
                <div className=' h-[30%] rounded-3xl bg-gray-300 text-black mt-24 flex items-center justify-center w-[75%]'>
                  <h1 className='text-4xl'>1. What is Clue one??</h1>
                </div>
                <div className="form-control">
  <input
    type="text"
    required=""
    placeholder="Type something intelligent"
    className="input input-alt"
  />
  <span className="input-border input-border-alt"></span>
</div>                <div id='clue' className='mt-20'>
  <button >Submit</button>
</div>
            </div>




            <nav className='border-2 border-gray-800 md:-translate-y-5 mb-5 text-3xl font-light w-[90%] md:w-[70%] self-center rounded-3xl items-center flex justify-evenly h-[10%]'>
            <Link href='/hunt/hi'>
            <RiHomeLine className={`cursor-pointer ${active=== 'home' ? 'text-green-400' : 'text-white'  }`} onClick={()=>setactive('home')} />
            </Link>
            <Link href='/hunt/leaderboard'>

            <MdOutlineLeaderboard  className={`cursor-pointer ${active=== 'leaderBoard' ? 'text-green-400' : 'text-white'  }`} onClick={()=>setactive('leaderBoard')} />
            </Link>

            <Link href='/hunt/hi'>

            <VscAccount  className={`cursor-pointer ${active=== 'Account' ? 'text-green-400' : 'text-white'  }`} onClick={()=>setactive('Account')} />
            </Link>

            </nav>

            <CiCircleQuestion className=' self-end text-5xl fixed translate-y-16 cursor-pointer hover:text-green-500 -translate-x-12' />
    </div>
  )
}

export default page