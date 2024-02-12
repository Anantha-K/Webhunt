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
                var token=  jwt.sign(
                        {success:true,
                        email:Users.email,
                        password:Users.password},'Secret',{expiresIn:"1h"}
                )
                        const response = NextResponse.json({
                            message:"Login Successful",
                            success:true,
                        })
                        response.cookies.set("token",token,{
                            httpOnly:true,
                        })
                        return response;
                       
                
            }else{
              return  NextResponse.json({message:"Incorrect password"},{status:400})

            }
        }else{
            return NextResponse.json({message:"No user"},{status:400})

        }
    }
    catch(error){
        return NextResponse.json({message:"No user"},{status:400})
    }
}
