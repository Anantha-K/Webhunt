import { NextRequest, NextResponse } from "next/server";

const { default: connect } = require("@/db");
const { default: User } = require("@/models/User");

connect();

export const GET = async (NextRequest) => {
    try {
        const email = NextRequest.nextUrl.searchParams.get("email");
        console.log('Email:', email);

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log('User:', user);
        return NextResponse.json({
            firstLogin: user.firstLogin
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
};