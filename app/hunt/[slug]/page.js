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
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const[correctAnswer,setCorrectAnswer]=useState('');
  const [questionText, setQuestionText] = useState("");
  const [flipped, setisFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [btnActive, setbtnActive] = useState(true);
  const [user, setuser] = useState();
  const [level, setlevel] = useState(0);
  const [score, setscore] = useState(0);
  const [userEmail,setUserEmail]= useState('');

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setuser(tkn);
    if (tkn) {
      try {
        const payload = JSON.parse(atob(tkn.split('.')[1]));
        const email = payload.email;
        setUserEmail(email);
        console.log("Parsed email from token:", email);
        if (email) {
          fetchData(email);
        } else {
          throw new Error("Email not found in token");
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        toast.error("Invalid token. Please log in again.");
      }
    } else {
      console.log("No token found");
      toast.error("Please log in to continue");
    }
  }, []);


  
  const fetchData = async (email) => {
    let url = `http://localhost:3000/api/auth/fetchQue?email=${email}`;
  
    try {
      let resp = await fetch(url);
      let response = await resp.json();
      console.log(response);
      console.log(response.question.questionText)
      
      if (response.message === "Successful" && response.question) {
        setHints(response.question.hints || []);
        setlevel(response.question.levelNumber);
        setscore(response.user.score);
        setHints(response.question.hints);
        setCorrectAnswer(response.question.answer);
        setQuestionText(response.question.questionText);
      } else {
        toast.error("Failed to fetch question");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  const updateData = async (newScore, newLevel) => {
    const tkn = localStorage.getItem("token");
    if (tkn) {
      try {
        const payload = JSON.parse(atob(tkn.split('.')[1]));
        const email = payload.email;
        const data = { email, score: newScore, level: newLevel, hints: hints.length - currentHintIndex };
        let res = await fetch("http://localhost:3000/api/auth/updateHunt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        console.log(res);
        let response = await res.json();
        console.log(response);
      } catch (error) {
        console.error("Error updating data:", error);
        toast.error("Error updating data");
      }
    }
  };



  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    toast.loading("Logging Out");
    localStorage.removeItem("hints");
    localStorage.removeItem("level");
    localStorage.removeItem("score");

    setTimeout(() => {
      toast.success("Logged out");
      window.location.href = "/";
    }, 500);
  };

  const handleHint = () => {
    if (!showHint) {
      if (hints.length > currentHintIndex) {
        setCurrentHintIndex(prevIndex => prevIndex + 1);
        setscore(score - 100);
        setShowHint(true);
        toast("- 100 Points", {
          icon: "❗️",
          position: "bottom-right"
        });
        setTimeout(() => {
          setShowHint(false);
        }, 10000);
      } else {
        setbtnActive(false);
        toast.error("Sorry, you have no more hints left.");
      }
    } else {
      toast.error("Wait for the current hint to disappear.");
    }
  };



  const fetchNextQuestion = async (email) => {
    let url = `http://localhost:3000/api/auth/fetchQue?email=${email}`;
  
    try {
      let resp = await fetch(url);
      let response = await resp.json();
      console.log(response);
  
      if (response.message === "Successful" && response.question) {
        return response.question;
      } else {
        toast.error("Failed to fetch next question");
        return null;
      }
    } catch (error) {
      console.error("Error fetching next question:", error);
      toast.error("Error fetching next question");
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer === "") {
      toast.error("Enter answer!");
    } else if (answer.toLowerCase() !== correctAnswer.toLowerCase()) {
      toast.error("Wrong Guess!");
      setAnswer("");
    } else {
      toast.success("🎉 Correct Answer");
      setTimeout(() => {
        toast.success("+1000 Points!", { position: "bottom-right" });
      }, 500);
  
      const newScore = score + 1000;
      const newLevel = level < 16 ? level + 1 : level;
  
      await updateData(newScore, newLevel);
  
      const tkn = localStorage.getItem("token");
      if (tkn) {
        try {
          const payload = JSON.parse(atob(tkn.split('.')[1]));
          const email = payload.email;
          if (email) {
            const nextQuestion = await fetchNextQuestion(email);
            if (nextQuestion) {
              setHints(nextQuestion.hints || []);
              setCurrentHintIndex(0);
              setlevel(nextQuestion.levelNumber);
              setscore(newScore);
              setCorrectAnswer(nextQuestion.answer);
              setQuestionText(nextQuestion.questionText);
              setShowHint(false);
              setAnswer("");
            }
          } else {
            throw new Error("Email not found in token");
          }
        } catch (error) {
          console.error("Error parsing token:", error);
          toast.error("Invalid token. Please log in again.");
        }
      } else {
        console.log("No token found");
        toast.error("Please log in to continue");
      }
    }
  };


  return (
    <>
    <style jsx>{`
  .flip-text {
    transform: scaleX(-1);
  }
`}</style>

      {user ? (
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
<h1 className={`${showHint ? "hidden" : ""} text-base md:text-2xl mx-12`}>
  {questionText || "Loading question..."}
  </h1>
  <h1 className={`${showHint ? "flip-text" : "hidden"}`}>
  {hints[currentHintIndex - 1]?.hintContent || "No hint available"}
</h1></motion.div>
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
                className={`${
                  btnActive
                    ? "hover:cursor-pointer"
                    : "hover:cursor-not-allowed"
                } `}
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
              <span className="text-red-500 font-bold">
  {hints.length - currentHintIndex > 0 ? hints.length - currentHintIndex : 0}
</span>            </div>
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
              <IoIosLogOut
                className={`cursor-pointer ${
                  active === "Account" ? "text-green-400" : "text-white"
                }`}
                onClick={() => logOut()}
              />
            </Link>
          </nav>
        </div>
      ) : (
        <div>hi</div>
      )}
    </>
  );
};

export default page;
