import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";
import Vehicle from "@/models/Vehicle";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { fullName, username, email, password, isVerified, vehicleDetails } =
      await req.json();

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !isVerified ||
      !vehicleDetails
    ) {
      return NextResponse.json(
        { message: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
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
    // Check if the vehicle already exists
    const vehicleExits = await Vehicle.findOne({
      registrationNumber: vehicleDetails.registrationNumber,
    });
    if (vehicleExits) {
      return NextResponse.json(
        { message: "Vehicle already exists" },
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

    const hashedPassword = bcrypt.hashSync(password, 10);

    var tollRate = 0;

    switch (vehicleDetails.vehicleCategory) {
      case "MC 50CC":
      case "MCWOG/FVG":
      case "MC EX50CC":
      case "M/CYCL WG":
        tollRate = 0;
        break;
      case "LMV":
      case "LMV-NT":
        tollRate = 70 / 60;
        break;
      case "MGV":
        tollRate = 100 / 60;
        break;
      case "HMV":
      case "HGMV":
      case "HPMV":
      case "HTV":
        tollRate = 150 / 60;
        break;
      case "Trailer":
        tollRate = 90 / 60;
        break;
      default:
        tollRate = 100 / 60;
    }
    const getAsciiRepresentation = (name: string) => {
      return name
        .split("")
        .map((char) => char.charCodeAt(0))
        .join("");
    };
    const uniqueVehicleNumber =
      vehicleDetails.registrationNumber +
      "-" +
      getAsciiRepresentation(username.slice(0, 3));
    const newVehicle = new Vehicle({
      ...vehicleDetails,
      tollRate,
      uniqueVehicleNumber,
    });
    await newVehicle.save();
    // Create a new user
    const newUser = new UserModel({
      fullName,
      username,
      email,
      isAdminApproved: false,
      password: hashedPassword,
      isVerified,
      vehicle: newVehicle._id,
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
