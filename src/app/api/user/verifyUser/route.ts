import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import User from "@/models/User";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Server configuration error: JWT_SECRET missing" },
      { status: 500 }
    );
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const user = await User.findById(data.id).populate("vehicle");

    if (!user) {
      return NextResponse.json({ error: "FPS not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    console.log(err);
    const errorMessage =
      err.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Token verification failed";
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }
}
