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
  const [hints, setHints] = useState(3);

  const handleChange=(e)=>{
    const value=e.target.value;
    setAnswer(value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setAnswer('');
  }

  const handleHint=()=>{
    if (hints > 0) {
      setHints(hints - 1);
      if (hints === 3) {
        alert('Hint 1: Clue one is related to the number 1.');
      } else if (hints === 2) {
        alert('Hint 2: Clue one is a common programming concept.');
      } else {
        alert('Hint 3: Clue one is a JavaScript primitive type.');
      }
    } else {
      alert('Sorry, you have no more hints left.');
    }
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
</div>                <div id='clue' className='mt-20 flex space-x-5'>
  <button id='hint' className='hover:cursor-pointer' onClick={handleHint} >Hint</button>
  <button onClick={handleSubmit} className='hover:cursor-pointer' >Submit</button>
</div>
<div className='text-black px-5 mt-5 translate-y-16 bg-white py-1 rounded-3xl'>Hints remaining: <span className='text-red-500 font-bold'>{hints}</span></div>

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