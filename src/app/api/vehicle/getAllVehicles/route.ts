import User from "@/models/User";
import dbConfig from "@/middlewares/db.config";
import { NextResponse } from "next/server";
import Vehicle from "@/models/Vehicle";

dbConfig();

export async function GET() {
  const vehicle = await Vehicle.find();
  if (!vehicle) {
  }
  const users = await User.find().populate("vehicle");
  return NextResponse.json(users, { status: 200 });
}
