import dbConfig from "@/middlewares/db.config";
import Vehicle from "@/models/Vehicle";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const users = await Vehicle.find();
  return NextResponse.json(users, { status: 200 });
}
