import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const users = await UserModel.find();
  return NextResponse.json(users, { status: 200 });
}
