'use client'
import React, { useState } from 'react'
import { MdOutlineLeaderboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import Link from 'next/link';
import { CiCircleQuestion } from "react-icons/ci";

const page = () => {
    const [active, setactive] = useState('home')
    const[answer,setAnswer]=useState('');
  const handleChange=(e)=>{
    const value=e.target.value;
    setAnswer(value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    setAnswer('');
    
  }
  return (
    <div className='w-full bg-black text-white h-screen flex flex-col'>
            <div className='h-[90%] flex flex-col items-center '>
                <div className=' h-[30%] rounded-3xl bg-gray-200 text-black mt-24 flex items-center justify-center w-[75%]'>
                  <h1 className='text-4xl'>1. What is Clue one??</h1>
                </div>
                <div className="form-control">
  <input
  name='Answer'
  value={answer}
  onChange={handleChange}
  type="text"
    required=""
    placeholder="Enter Your Answer..."
    className="input input-alt mt-16"
  />
  <span className="input-border input-border-alt"></span>
</div>                <div id='clue' className='mt-20'>
  <button onClick={handleSubmit} >Submit</button>
</div>


<div className='h-24 flex items-center w-[70%] text-white'>

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

    </div>
  )
}

export default page