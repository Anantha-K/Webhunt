import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse, userAgent } from "next/server";
var jwt = require('jsonwebtoken')

connect();
export const GET = async (request)=>{
    const email='ieee@iee.com'
    const password='hunt'
    try{
        const Users=await User.findOne({email});
        if(Users){
            if(Users.password === password){
                var token= jwt.sign(
                        {success:true,
                        email:Users.email,
                        password:Users.password},'Secret'
                )
                return new NextResponse({token},{status:200})
                
                
            }else{
                return new NextResponse("Incorrect password matches",{status:200})

            }
        }else{
            return new NextResponse("User Does'nt exist",{status:200})

        }
    }
    catch(error){
        return new NextResponse("User Does'nt Exist"+error,{status:400});
    }
}
