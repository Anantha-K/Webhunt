import { NextRequest, NextResponse } from "next/server";
const { default: connect } = require("@/db");
const { default: User } = require("@/models/User");

connect();

export const GET = async ( NextRequest) => {
  try {
    const email = request.nextUrl.searchParams.get("email");
    
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    
    // Fetch user from database
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Return score and time taken
    return NextResponse.json({
      score: user.score,
      timeTaken: user.timeTaken || (2 * 60 * 60 * 1000) // Default to 2 hours if not set
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching game completion details:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};