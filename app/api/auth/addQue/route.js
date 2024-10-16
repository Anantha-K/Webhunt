import connect from "@/db";
import Level from "@/models/Level";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request) => {
  try {
    const { levelNumber, question, answer, points } = await request.json();
    
    if (!levelNumber || !question || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    

    const existingLevel = await Level.findOne({ levelNumber });
    if (existingLevel) {
      return NextResponse.json(
        { error: "Level already exists" },
        { status: 409 }
      );
    }
    
    const newLevel = new Level({
      levelNumber,
      question,
      answer,
      points: points || 1000
    });
    
    await newLevel.save();
    
    return NextResponse.json(
      { message: "Level created successfully", level: newLevel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating level:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the level" },
      { status: 500 }
    );
  }
};