import { NextRequest, NextResponse } from "next/server";

const { default: connect } = require("@/db");
const { default: Level } = require("@/models/Level");
const { default: User } = require("@/models/User");

connect();
export const GET = async (NextRequest) => {
    try {
  
      const email = await NextRequest.nextUrl.searchParams.get("email");
  
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "No user Found" }, { status: 404 });
      }
  
      const userlvl = user.currentLevel;
  
      const question = await Level.findOne({ levelNumber: userlvl });
      if (!question) {
        return NextResponse.json({ message: "No question found" }, { status: 404 });
      }
      return NextResponse.json({
        message: "Successful",
        question: {
            answer:question.answer,
          levelNumber: question.levelNumber,
          questionText: question.question,
          hints: question.hints,
          currentLevelClues: user.hintsremaining,
        },
        user: {
          score: user.score,
        }
      }, { status: 200 });
    } catch (e) {
      console.error("Error in API route:", e);
      return NextResponse.json({ message: "Server Error", error: e.message }, { status: 500 });
    }
  };