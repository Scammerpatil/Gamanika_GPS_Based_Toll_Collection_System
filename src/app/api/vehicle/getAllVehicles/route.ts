import User from "@/models/User";
import dbConfig from "@/middlewares/db.config";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const users = await User.find().populate("vehicles");
  return NextResponse.json(users, { status: 200 });
}
