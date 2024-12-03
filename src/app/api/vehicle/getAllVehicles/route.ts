import dbConfig from "@/middlewares/db.config";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const users = await UserModel.find().populate("vehicle");
  return NextResponse.json(users, { status: 200 });
}
