import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request)=>{
    const {name,score,level,currentLevelClues}={
        name:"Anantha",
    score:100,
    level:1,
   currentLevelClues:0,
};   
 try{
    const newHunt=  new Hunt({name,score,level,currentLevelClues});
    await newHunt.save();
    return NextResponse.json({ message: "User created" }, { status: 201 });
    }catch(error){
        return NextResponse.json({ message: "Error" }, { status: 400 });

    }
} 