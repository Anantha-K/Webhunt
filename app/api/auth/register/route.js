import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


connect();

export const POST = async (request, response) => {
    const {name,email,password}=await request.json();

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 400 }
            );
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};