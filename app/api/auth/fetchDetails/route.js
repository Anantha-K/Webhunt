import connect from "@/db";
import Hunt from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request) => {
    const email =await request.query;
  const UserDet = await Hunt.findOne({email});
  return NextResponse.json({ UserDet });
};