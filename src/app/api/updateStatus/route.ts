import UserModel from "@/models/User";
import mongoose, { Mongoose } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { registrationNumber, status } = await req.json();
    const statusBoolean = status === true;
    if (!registrationNumber || !status) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const user = await UserModel.findOne({
      "vehicle.registrationNumber": registrationNumber,
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.isAdminApproved = statusBoolean;
    const updatedUser = await user.save();
    if (updatedUser) {
      return NextResponse.json({ message: "User updated successfully" });
    }
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
