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
    const [hints, setHints] = useState("");
    const [flipped, setisFlipped] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [btnActive, setbtnActive] = useState(true);
    const [user, setUser] = useState();
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await fetchData();
          setUser(token); 
        } catch (error) {
          console.error('Error fetching data:', error); 
          toast.error('Could not load user data');
        }
      } 
    };

    checkIfLoggedIn();  
  }, []);

  const fetchData = async () => {
    const email = "anandu@fisat.com"; 
    const url = `http://localhost:3000/api/auth/fetchDetails?email=${email}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch details');
    }

    const data = await response.json();
    setHints(data.currentLevelClues || 3);
    setLevel(data.level || 0);
    setScore(data.score || 0);
  };

  const updateData = async () => {
    const email = "anandu@fisat.com";
    const data = { email, score, level, hints };

    try {
      const res = await fetch("http://localhost:3000/api/auth/updateHunt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Failed to save progress');
    }
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hints");
    localStorage.removeItem("level");
    localStorage.removeItem("score");

    toast.loading("Logging Out"); 
    setTimeout(() => {
      toast.success("Logged out");
      window.location.href = "/";
    }, 500);
  };

  const handleHint = () => {
    if (!showHint) {
      if (hints > 0) {
        setHints(hints - 1);
        setScore(score - 50);
        setShowHint(true);
        toast("- 50 Points", { icon: "❗️" });

        setTimeout(() => {
          setShowHint(false);
          updateData(); 
        }, 10000);
      } else {
        setBtnActive(false);
        toast.error("Sorry, you have no more hints left.");
      }
    } else {
      toast.error("Wait");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(""); 

    if (answer.toLowerCase() === "hello") { 
      toast.success("Correct Answer");
      setShowHint(false); 
      setHints(3); 

      if (level < 10) {
        setLevel(level + 1);
      }

      setScore(score + 250);

      setTimeout(() => {
        updateData(); 
      }, 2000); 
    } else {
      toast.error("Wrong Guess!");
    }
  };


// ... (rest of your component code)

return (
    <>
      {user === null ? ( 
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div> 
      ) : user ? ( 
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
              {/* Replace with your actual question & hint for the level  */}
              <h1 className={`${showHint ? "hidden" : ""}`}>
                1. What is Clue one??
              </h1>
              <h1 className={`${showHint ? "" : "hidden"} `}>HINT 1</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="form-control"> 
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
            </form> 

            <div id="clue" className="mt-20 flex space-x-5">
              <button
                id="hint"
                className={`${btnActive ? "" : "opacity-50 cursor-not-allowed"}`} 
                onClick={handleHint}
              >
                Hint
              </button>
              <button type="submit" className=""> 
                Submit
              </button>
            </div>

            <div className="text-black px-5 mt-5 translate-y-16 bg-white py-1 rounded-3xl">
              Hints remaining:{" "}
              <span className="text-red-500 font-bold">{hints}</span>
            </div>
          </div> 

          <nav className="your-nav-styles-here"> 
            {/* Nav Elements from your previous code with Link Component */}
          </nav>
        </div>
      ) : ( 
        <div className="h-screen w-full flex items-center justify-center">
          <p>Please log in to play</p> 
          <Link href="/">Login</Link> 
        </div>
      )}
    </>
  );
};


export default page;
