import connect from "@/db";
import Level from "@/models/Level";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

connect();

export const DELETE = async (NextRequest) => {
    try {
      const result = await Level.deleteMany({});
      return NextResponse.json({ 
        message: "All users deleted successfully", 
        deletedCount: result.deletedCount 
      });
    } catch (error) {
      return NextResponse.json({ 
        error: "An error occurred while deleting users" 
      }, { status: 500 });
    }
  };