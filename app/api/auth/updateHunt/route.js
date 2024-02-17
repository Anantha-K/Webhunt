import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request)=>{
    const { email, score, level ,hints} = await request.json();
try{
       
        
    const userLvl =await Hunt.findOne({email});
    userLvl.score=score;
    userLvl.level=level;
    userLvl.currentLevelClues=hints;

    await userLvl.save();

    return NextResponse.json({ message: "Success" }, { status: 201 });
}
catch(error){
    return NextResponse.json({message:"Error"},{status:400})
}
}