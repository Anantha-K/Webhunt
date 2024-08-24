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
  const [flipped, setisFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [btnActive, setbtnActive] = useState(true);
  const [user, setuser] = useState();
  const [level, setlevel] = useState(1);
  const [score, setscore] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);

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
    setuser(tkn);
    if (tkn) {
      try {
        const payload = JSON.parse(atob(tkn.split(".")[1]));
        const email = payload.email;
        setUserEmail(email);
        checkContestStatus().then((isActive) => {
          if (isActive) {
            checkGame(email).then(() => {
              if (!gameOver) {
                fetchData(email);
              }
            });
          } else {
            toast.error("The contest is not currently active.");
            setGameOver(true);
          }
        });
      } catch (error) {
        console.error("Error parsing token:", error);
        toast.error("Invalid token. Please log in again.");
      }
    } else {
      console.log("No token found");
      toast.error("Please log in to continue");
    }
  }, [gameOver]);

  const checkContestStatus = async () => {
    let url = `https://webhunt-ieee.vercel.app/api/auth/checkContest`;
    try {
      let rsp = await fetch(url);
      let rspn = await rsp.json();
      console.log("Contest Status Response: ", rspn);
      return rspn.isActive;
    } catch (e) {
      console.error("Error checking contest status: ", e);
      return false;
    }
  };
  const checkGame = async (email) => {
    let url = `https://webhunt-ieee.vercel.app/api/auth/checkGame?email=${email}`;
    try {
      let rsp = await fetch(url);
      let rspn = await rsp.json();
      console.log("CheckGame Response: ", rspn);

      if (rspn.message === "Over") {
        setGameOver(true);
      }
    } catch (e) {
      console.error("Error checking game over status: ", e);
    }
  };

  const fetchData = async (email) => {
    let url = `https://webhunt-ieee.vercel.app/api/auth/fetchQue?email=${email}`;
    
    try {
      let resp = await fetch(url);
      let response = await resp.json();
      
      if (response.message === "Successful" && response.question) {
        setHints(response.question.hints || []);
        setCurrentHintIndex(0);
        setlevel(response.question.levelNumber);
        setscore(response.user.score);
        setCorrectAnswer(response.question.answer);
        setQuestionText(response.question.questionText);
  
        const remainingHints = response.user.hintsRemaining || 3;
setHintsRemaining(remainingHints);
setbtnActive(remainingHints > 0);
        return response.question;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
      return null;
    }
  };
  const updateData = async (newScore, newLevel, remainingHints = 3) => {
    try {
      const email = userEmail;
      const data = {
        email,
        score: newScore,
        currentLevel: newLevel,
        hintsRemaining: remainingHints,
        scoreTimestamp: new Date(),
      };

      let res = await fetch("/api/auth/UpdateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await res.json();
      console.log(response);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
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
        setCurrentHintIndex((prevIndex) => prevIndex + 1);
        const newScore = score - 100;
        const remainingHints = hints.length - (currentHintIndex + 1);
        setHintsRemaining(prevHints => prevHints - 1);

        updateData(newScore, level, remainingHints);
        setShowHint(true);
        toast("- 100 Points", {
          icon: "❗️",
          position: "bottom-right",
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

  // const fetchNextQuestion = async (email) => {
  //   let url = `https://webhunt-ieee.vercel.app/api/auth/fetchQue?email=${email}`;

  //   try {
  //     let resp = await fetch(url);
  //     let response = await resp.json();
  //     alert(response.question.questionText)

  //     if (response.message === "Successful" && response.question) {
  //       return response.question;
  //     } else {
  //       toast.error("Failed to fetch next question");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching next question:", error);
  //     toast.error("Error fetching next question");
  //     return null;
  //   }
  // };


  const handleSkip = async (e) => {
    e.preventDefault();
  
    // if (score < 400) {
    //   toast.error("Not enough points to skip!");
    //   return;
    // }
  
    toast("-400 Points", {
      icon: "❗️",
      position: "bottom-right",
    });
  
    const newScore = score - 400;
    const newLevel = level + 1;
  
    try {
      await updateData(newScore, newLevel);
      const nextQuestion = await fetchData(userEmail);
  
      if (nextQuestion) {
        setHints(nextQuestion.hints || []);
        setCurrentHintIndex(0);
        setlevel(newLevel);
        setscore(newScore);
        setCorrectAnswer(nextQuestion.answer);
        setQuestionText(nextQuestion.questionText);
        setShowHint(false);
        setAnswer("");
        toast.success("Level Skipped! New Question Loaded.");
      } else {
        toast.error("Failed to fetch next question.");
      }
    } catch (error) {
      console.error("Error skipping question:", error);
      toast.error("Error skipping question.");
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

      const newScore = score + 1000;
      const newLevel = level + 1;

      await updateData(newScore, newLevel);
      if (newLevel == 16) {
        let res = await fetch(
          `https://webhunt-ieee.vercel.app/api/auth/gameOver?email=${userEmail}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setTimeout(() => {
          window.location.href = "/hunt/leaderboard";
        }, 2000);
      }
      if (newLevel != 16) {
        const nextQuestion = await fetchData(userEmail);

        if (nextQuestion) {
          setHints(nextQuestion.hints || []);
          setCurrentHintIndex(0);
          setlevel(newLevel);
          setscore(newScore);
          setCorrectAnswer(nextQuestion.answer);
          setQuestionText(nextQuestion.questionText);
          setShowHint(false);
          setAnswer("");
        } else {
          // toast.error("Failed to fetch next question");
        }

        setTimeout(() => {
          toast.success("+1000 Points!", { position: "bottom-right" });
        }, 500);
      } else {
        setTimeout(() => {
          setGameOver(true);
        }, 1000);
        toast.success("Hunt Complete!");
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

            <nav className="border-2 mt-56 border-gray-800 md:-translate-y-5 mb-5 text-3xl font-light w-[90%] md:w-[70%] self-center rounded-3xl items-center flex justify-evenly h-[10%]">
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
                } text-base md:text-2xl mx-12`}
              >
                {questionText || "Loading question..."}
              </h1>
              <h1 className={`${showHint ? "flip-text" : "hidden"}`}>
              {hints[currentHintIndex - 1]?.hintType === "text" ? (
                  <p>{hints[currentHintIndex - 1]?.hintContent || "No hint available"}</p>
                ) : hints[currentHintIndex - 1]?.hintType === "image" ? (
                  <Image src={hints[currentHintIndex - 1]?.hintContent} alt="Hint" width={200} height={200} className="max-w-full h-auto" />
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
              <button onClick={handleSkip} className="hover:cursor-pointer">
                Skip
              </button>
            </div>
            <div className="text-black px-5 mt-5 translate-y-16 bg-white py-1 rounded-3xl">
              Hints remaining:{" "}
              <span className="text-red-500 font-bold">
              {hintsRemaining}
              </span>{" "}
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
