import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign(
                    { success: true, email: user.email },
                    'Secret',
                    { expiresIn: "1h" }
                );

                const response = NextResponse.json({
                    token: token,
                    message: "Login Successful",
                    success: true,
                });
                response.cookies.set('token', token, {
                    httpOnly: true,
                });
                return response;

            } else {
                return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: "No user found" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};