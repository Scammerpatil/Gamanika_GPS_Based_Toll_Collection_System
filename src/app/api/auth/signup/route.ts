import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { fullName, username, email, password, isVerified, vehicle } =
      await req.json();

    console.log("Vehicle:", vehicle.vehicleCatg);

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !isVerified ||
      !vehicle
    ) {
      return NextResponse.json(
        { message: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Check if the username already exists
    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if the vehicle number plate already exists
    const vehicleNumberExists = await UserModel.findOne({
      "vehicle.vehicleNumberPlate": vehicle.vehicleNumberPlate,
    });
    if (vehicleNumberExists) {
      return NextResponse.json(
        { message: "Vehicle Number Plate already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    var tollRate = 0;

    switch (vehicle.vehicleCategory) {
      case "MC 50CC":
      case "MCWOG/FVG":
      case "MC EX50CC":
      case "M/CYCL WG":
        tollRate = 0; // Tax for motorcycles
        break;
      case "LMV":
      case "LMV-NT":
        tollRate = 70; // Example rate for light motor vehicles
        break;
      case "MGV":
        tollRate = 100; // Example rate for medium goods vehicle
        break;
      case "HMV":
      case "HGMV":
      case "HPMV":
      case "HTV":
        tollRate = 150; // Example rate for heavy vehicles
        break;
      case "Trailer":
        tollRate = 90; // Example rate for trailers
        break;
      default:
        tollRate = 100; // Default rate if no match found
    }

    // Create a new user
    const newUser = new UserModel({
      fullName,
      username,
      email,
      isAdminApproved: false,
      role: "user",
      password: hashedPassword,
      isVerified,
      vehicle,
      tollRate,
    });

    // Save the user to the database
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
