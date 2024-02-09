import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse, userAgent } from "next/server";
var jwt = require('jsonwebtoken')

connect();
export const POST = async (request)=>{
    const {email,password}=await request.json();

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
              return new NextResponse({message:"Incorrect password"},{status:400})

            }
        }else{
            return new NextResponse({message:"No user"},{status:400})

        }
    }
    catch(error){
        return new NextResponse({message:"No user"},{status:400})
    }
}
