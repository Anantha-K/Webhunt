import { NextRequest, NextResponse } from "next/server";
const connect = require("@/db").default;
const Level = require("@/models/Level").default;
const User = require("@/models/User").default;

connect();

export const GET = async (req) => {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    const userLevel = user.currentLevel;
    const question = await Level.findOne({ levelNumber: userLevel });
    if (!question) {
      return NextResponse.json({ message: "No question found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Successful",
      question: {
        answer: question.answer,
        levelNumber: question.levelNumber,
        questionText: question.question,
        hints: question.hints,
      },
      user: {
        score: user.score,
        hintsRemaining: user.hintsRemaining,
      }
    }, { status: 200 });
  } catch (e) {
    console.error("Error in API route:", e);
    return NextResponse.json({ message: "Server Error", error: e.message }, { status: 500 });
  }
};