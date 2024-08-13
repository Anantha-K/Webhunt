import connect from "@/db";
import Level from "@/models/Level";
import { NextRequest, NextResponse } from "next/server";


connect();
export const POST=async(request,response)=>{
    try{
        const {levelNumber,question,hints,answer,points} = await request.json();
        if (!levelNumber || !question || !hints || !answer) {
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
            hints,
            answer,
            points: points || 250 
          });

        await newLevel.Save()
        return NextResponse.json(
            { message: "Level created successfully", level: newLevel },
            { status: 201 }
          );


    }catch(e){
        console.error("Error creating level:", error);
        return NextResponse.json(
          { error: "An error occurred while creating the level" },
          { status: 500 });
    }

}