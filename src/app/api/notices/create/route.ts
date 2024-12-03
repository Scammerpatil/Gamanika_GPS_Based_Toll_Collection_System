import dbConfig from "@/middlewares/db.config";
import Notice from "@/models/Notices";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json(
      {
        error: "Please fill all the fields",
      },
      { status: 400 }
    );
  }
  try {
    const newNotice = new Notice({
      title,
      description,
    });
    await newNotice.save();
    return NextResponse.json(
      {
        message: "Notice added successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
