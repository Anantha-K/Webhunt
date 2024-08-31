import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
  try {
    const users = await User.find().sort({ score: -1, scoreTimestamp: 1 });
    
    console.log("Raw users from database:", users); 
    
    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    
    const leaderboard = users.map((user) => {
      console.log(`User ${user.name}'s score:`, user.score, typeof user.score);
      return {
        name: user.name,
        email: user.email,
        score: user.score,
        currentLevel: user.currentLevel,
        finishTime: user.scoreTimestamp,
      };
    });
    
    console.log("Processed leaderboard:", leaderboard);
    
    return NextResponse.json({
      message: "Leaderboard fetched successfully",
      leaderboard: leaderboard,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};