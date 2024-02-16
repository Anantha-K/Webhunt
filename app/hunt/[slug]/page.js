"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

 

const page = () => {
  
  const [active, setactive] = useState("home");
  const [answer, setAnswer] = useState("");
  const [hints, setHints] = useState(3);
  const [flipped, setisFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [btnActive, setbtnActive] = useState(true);
  const [user, setuser] = useState('');
  const [level, setlevel] = useState(0);
  const [score, setscore] = useState(0);
  useEffect(() => {
    const tkn = localStorage.getItem('token');
    setuser(tkn)

    
  }, [])
  
  const fetchData=async()=>{
    const email="hel@hi.com";
    const data ={email,score,level};
    let resp= await fetch ('http://localhost:3000/api/auth/updateHunt',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
          })
      
          console.log(resp);
    let response =await resp.json();
    console.log(response);
  }
  
  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
  };
  const logOut=()=>{
    localStorage.removeItem("token");
    toast.loading("Logging Out")
    setTimeout(() => {
      toast.success("Logged out")
      window.location.href='/';
      
    }, 500);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer===''){
      toast.error("Enter answer!");
    }
    else if(answer!="Hello"){
      toast.error("Wrong Guess!");

      
    }
    else if(answer==='Hello'){

        toast.success("Correct Answer")
        setAnswer("");
        setShowHint(false);
        setHints(3);
        if(level<10){
          setlevel(level+1);
          fetchData();

        }




    }


    
  };

  const handleHint = () => {
    if(!showHint){
    if (hints > 0) {
      setHints(hints - 1);
      setShowHint(!showHint); 
      toast('- 50 Points', {
        icon: '❗️',
      });
      setTimeout(() => {
        setShowHint(false);
      }, 10000);
    } else {
      setbtnActive(false);
      toast.error("Sorry, you have no more hints left.");
    }}else{
      toast.error("Wait");
    }
  };

  return (
    <>
    {user?(
    <div className="w-full bg-black text-white h-screen flex flex-col">
      <Toaster />
      <div className="h-[90%] flex flex-col items-center ">
      <motion.div
  className="h-[30%] rounded-3xl bg-gray-200 text-2xl md:text-4xl text-black mt-24 flex items-center justify-center w-[75%]"
  animate={showHint ? "flip" : ""}
  initial="unflip"
  variants={{
    unflip: { scaleX: 1 },
    flip: { scaleX: -1 },
  }}
  transition={{ duration: 1 }}
>
  <h1 className={`${showHint ? 'hidden' : 't'}`}>
    1. What is Clue one??
  </h1>
  <h1 className={`${showHint ? '' : 'hidden'} `}>HINT 1</h1>
</motion.div>
        <div className="form-control">
          <input
            name="Answer"
            value={answer}
            onChange={handleChange}
            type="text"
            required=""
            placeholder="Enter Your Answer..."
            className="input input-alt mt-16"
          />
          <span className="input-border input-border-alt"></span>
        </div>{" "}
        <div id="clue" className="mt-20 flex space-x-5">
          <button
            id="hint"
            className={`${btnActive?'hover:cursor-pointer':'hover:cursor-not-allowed'} `}
            onClick={handleHint}
          >
            Hint
          </button>
          <button onClick={handleSubmit} className="hover:cursor-pointer">
            Submit
          </button>
        </div>
        <div className="text-black px-5 mt-5 translate-y-16 bg-white py-1 rounded-3xl">
          Hints remaining:{" "}
          <span className="text-red-500 font-bold">{hints}</span>
        </div>
        <div className="h-24 flex items-center w-[70%] text-white"></div>
      </div>

      <nav className="border-2 border-gray-800 md:-translate-y-5 mb-5 text-3xl font-light w-[90%] md:w-[70%] self-center rounded-3xl items-center flex justify-evenly h-[10%]">
        <Link href="/hunt/hi">
          <RiHomeLine
            className={`cursor-pointer ${
              active === "home" ? "text-green-400" : "text-white"
            }`}
            onClick={() => setactive("home")}
          />
        </Link>
        <Link href="/hunt/leaderboard">
          <MdOutlineLeaderboard
            className={`cursor-pointer ${
              active === "leaderBoard" ? "text-green-400" : "text-white"
            }`}
            onClick={() => setactive("leaderBoard")}
          />
        </Link>

        <Link href="/">
        <IoIosLogOut             className={`cursor-pointer ${
              active === "Account" ? "text-green-400" : "text-white"
            }`}
            onClick={() => logOut()}
          />
        </Link>
      </nav>
    </div>):<div>hi</div>
}
    </>
  );
};

export default page;
