import { NextRequest, NextResponse } from "next/server";

const { default: connect } = require("@/db");
const { default: Level } = require("@/models/Level");
const { default: User } = require("@/models/User");

connect();
export const GET = async (NextRequest)=>{
    try{
        const email = await NextRequest.nextUrl.searchParams.get("email");
        const user = await User.findOne({email});
        const userlvl = user.currentLevel;
        console.log(userlvl)
        const que = await Level.findOne({levelNumber:userlvl})
        console.log(que);

        return NextResponse.json({message:"Successful"},{status:200})
    }catch(e){
        return NextResponse.json({message:"Error"},{status:500})
    }
}