import connect from "@/db";
import ContestSettings from "@/models/contest";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async () => {
  try {
    const now = new Date();
    const contestSettings = await ContestSettings.findOne();

    if (!contestSettings) {
      return NextResponse.json({ message: "Contest settings not found" }, { status: 404 });
    }

    const { startTime, endTime } = contestSettings;
    const isActive = now >= new Date(startTime) && now <= new Date(endTime);

    return NextResponse.json({ isActive }, { status: 200 });
  } catch (error) {
    console.error("Error checking contest status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};