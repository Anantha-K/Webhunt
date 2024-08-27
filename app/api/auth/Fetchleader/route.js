import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
  try {
    const users = await User.find()
      .sort({ score: -1, scoreTimestamp: 1 });

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Leaderboard fetched successfully",
      leaderboard: users.map((user) => ({
        name: user.name,
        email: user.email,
        score: user.score,
        currentLevel: user.currentLevel,
        finishTime: user.scoreTimestamp,
      })),
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};