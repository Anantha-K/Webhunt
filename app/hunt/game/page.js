"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import Image from "next/image";


const Page = () => {
  const [active, setactive] = useState("home");
  const [answer, setAnswer] = useState("");
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [flipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [btnActive, setBtnActive] = useState(true);
  const [user, setUser] = useState();
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0); 



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  
 
  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setUser(tkn);
    if (tkn) {
      try {
        const payload = JSON.parse(atob(tkn.split(".")[1]));
        const email = payload.email;
        setUserEmail(email);
        initializeGame(email);
      } catch (error) {
        // console.error("Error parsing token:", error);
        toast.error("Invalid token. Please log in again.");
      }
    } else {
      toast.error("Please log in to continue");
    }
  }, []);




  useEffect(() => {
    if (userEmail) {
      const fetchRemainingTime = async () => {
        try {
          const response = await fetch(`/api/auth/getRemainingTime?email=${userEmail}`);
          const data = await response.json();
          if (data.remainingTime !== undefined) {
            setTimeLeft(data.remainingTime);

            const timer = setInterval(() => {
              setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                  clearInterval(timer);
                  setGameOver(true);
                  return 0;
                }
                return prevTime - 1;
              });
            }, 1000);
          } else {
            setGameOver(true);
          }
        } catch (error) {
          // console.error("Error fetching remaining time:", error);
        }
      };

      fetchRemainingTime();
    }
  }, [userEmail]);

  const formatTime = (time) => {
    time = Math.floor(time);
  
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };
  const initializeGame = async (email) => {
    try {
      const isActive = await checkContestStatus();
      if (isActive) {
        const gameStatus = await checkGame(email);
        if (!gameOver) {
          await fetchData(email);
          await fetchHintCount(email);
          await fetchCurrentHintIndex(email);
        }
      } else {
        toast.error("The contest is not currently active.");
        setGameOver(true);
      }
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  };

  const fetchHintCount = async (email) => {
    try {
      const response = await fetch(`/api/auth/getHintCount?email=${email}`);
      const data = await response.json();
      if (data.hintsRemaining !== undefined) {
        setHintsRemaining(data.hintsRemaining);
        setBtnActive(data.hintsRemaining > 0);
      }
    } catch (error) {
      console.error("Error fetching hint count:", error);
      toast.error("Error fetching hint count");
    }
  };

  const fetchCurrentHintIndex = async (email) => {
    try {
      const response = await fetch(`/api/auth/getCurrentIndex?email=${email}`);
      const data = await response.json();
      if (data.currentHintIndex !== undefined) {
        setCurrentHintIndex(data.currentHintIndex);
      } else {
        setCurrentHintIndex(0);
      }
    } catch (error) {
      console.error("Error fetching current hint index:", error);
      toast.error("Error fetching current hint index");
    }
  };

  const checkContestStatus = async () => {
    try {
      let rsp = await fetch(`/api/auth/checkContest`);
      let rspn = await rsp.json();
      return rspn.isActive;
    } catch (e) {
      console.error("Error checking contest status: ", e);
      return false;
    }
  };

  const checkGame = async (email) => {
    try {
      let rsp = await fetch(`/api/auth/checkGame?email=${email}`);
      let rspn = await rsp.json();
      if (rspn.message === "Over") {
        setGameOver(true);
      }
    } catch (e) {
      console.error("Error checking game over status: ", e);
    }
  };

  const fetchData = async (email) => {
    try {
      let resp = await fetch(`/api/auth/fetchQue?email=${email}`);
      let response = await resp.json();

      if (response.message === "Successful" && response.question) {
        setHints(response.question.hints || []);
        setLevel(response.question.levelNumber);
        setScore(response.user.score);
        setCorrectAnswer(response.question.answer);
        setQuestionText(response.question.questionText);
        setHintsRemaining(3); 
        setCurrentHintIndex(0); 
        setBtnActive(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  const updateData = async (newScore, newLevel, remainingHints, newHintIndex) => {
    try {
      const email = userEmail;
      const data = {
        email,
        score: newScore,
        currentLevel: newLevel,
        hintsRemaining: remainingHints,
        currentHintIndex: newHintIndex,
        scoreTimestamp: new Date(),
      };

      await fetch("/api/auth/UpdateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
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

  const handleHint = async () => {
    if (!showHint && btnActive) {
      if (hintsRemaining > 0 && currentHintIndex < hints.length) {
        const newHintIndex = currentHintIndex + 1;
        const newScore = score - 100;
        const newHintsRemaining = hintsRemaining - 1;

        await updateData(newScore, level, newHintsRemaining, newHintIndex);
        setCurrentHintIndex(newHintIndex);
        setHintsRemaining(newHintsRemaining);
        setScore(newScore);
        setBtnActive(newHintsRemaining > 0);

        setShowHint(true);
        toast("- 100 Points", {
          icon: "❗️",
          position: "bottom-right",
        });

        setTimeout(() => {
          setShowHint(false);
        }, 10000);
      } else {
        setBtnActive(false);
        toast.error("Sorry, you have no more hints left.");
      }
    } else {
      toast.error("Wait for the current hint to disappear.");
    }
  };

  const handleSkip = async (e) => {
    e.preventDefault();

    toast("-400 Points", {
      icon: "❗️",
      position: "bottom-right",
    });

    const newScore = score - 400;
    const newLevel = level + 1;

    try {
      await updateData(newScore, newLevel, hintsRemaining, currentHintIndex);
      await fetchData(userEmail);
    } catch (error) {
      console.error("Error skipping question:", error);
      toast.error("Error skipping question.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answer === "") {
      toast.error("Enter an answer!");
    } else if (answer.toLowerCase() !== correctAnswer.toLowerCase().trim()) {
      toast.error("Wrong Guess!");
      setAnswer("");
    } else {
      toast.success("🎉 Correct Answer");

      const newScore = score + 1000;
      const newLevel = level + 1;

      await updateData(newScore, newLevel, 3, 0);
      setHintsRemaining(3);
      setCurrentHintIndex(0);
      setBtnActive(true);

      if (newLevel === 16) {
        await fetch(`/api/auth/gameOver?email=${userEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Hunt Complete!");
        setTimeout(() => {
          window.location.href = "/hunt/leaderboard";
        }, 2000);
      } else {
        await fetchData(userEmail);
        setAnswer("");
        toast.success("+1000 Points!", { position: "bottom-right" });
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

      {gameOver ? (
        <>
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-full flex flex-col items-center bg-black">
              <Lottie options={defaultOptions} height={400} width={400} />
              <h1 className="text-3xl">Hunt Complete</h1>
              <p className="text-xl mt-2">Check out the leaderboard</p>
            </div>

            <nav className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-gray-800 text-3xl font-light flex justify-evenly items-center h-16 text-white">
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
        </>
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
              <h1
                className={`${
                  showHint ? "hidden" : ""
                }  text-sm md:text-2xl mx-12`}
              >
                {questionText || "Loading question..."}
              </h1>
              <h1 className={`${showHint ? "flip-text" : "hidden"}`}>
                {hints[currentHintIndex - 1]?.hintType === "text" ? (
                  <p>{hints[currentHintIndex - 1]?.hintContent || "No hint available"}</p>
                ) : hints[currentHintIndex - 1]?.hintType === "image" ? (
                  <Image
                  // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8Gd8aNzyFvp6lIxbnu8T0_rA9_GqofKhuA&s' 
                  src={hints[currentHintIndex - 1]?.hintContent} 
                  alt="Hint" width={300} height={400} className="max-w-full h-auto" />
                ) : (
                  "No hint available"
                )}
              </h1>
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
            </div>
            <div id="clue" className="flex flex-col md:flex-row mt-3 items-center justify-center md:space-x-5 md:space-y-0 space-y-4">
              <button
                id="hint"
                className={`${
                  btnActive ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
                }`}
                onClick={handleHint}
              >
                Hint
              </button>
              <button onClick={handleSubmit} className="hover:cursor-pointer">
                Submit
              </button>
              <button onClick={handleSkip} className="hover:cursor-pointer">
                Skip
              </button>
            </div>
            <div className="text-black px-5 mt-5 bg-white py-1 rounded-3xl hints-remaining">
              Hints remaining:{" "}
              <span className="text-red-500 font-bold">
                {hintsRemaining}
              </span>{" "}
            </div>
            <div className="text-black px-5 mt-5 bg-white py-1 rounded-3xl hints-remaining">
              Time remaining:{" "}
              <span className="text-red-500 font-bold">
                {formatTime(timeLeft)}
              </span>{" "}
            </div>
          </div>

          

          <nav className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-gray-800 text-3xl font-light flex justify-evenly items-center h-16 text-white">
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
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
          <h1 className="text-4xl">Please Sign In</h1>
          <p className="mt-4">
            <a href="/" className="text-green-400">
              Log in
            </a>{" "}
            to continue playing the game.
          </p>
        </div>
      )}
    </>
  );
};

export default Page;
