import connect from "@/db";
import ContestSettings from "@/models/contest";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request) => {
  try {
    const { startTime, endTime, isActive } = await request.json();

    if (!startTime || !endTime || typeof isActive !== "boolean") {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const contestSettings = await ContestSettings.findOneAndUpdate(
      {}, 
      { startTime, endTime, isActive },
      { new: true, upsert: true, runValidators: true } 
    );

    return NextResponse.json({ message: "Contest settings updated", contestSettings }, { status: 200 });
  } catch (error) {
    console.error("Error updating contest settings:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};