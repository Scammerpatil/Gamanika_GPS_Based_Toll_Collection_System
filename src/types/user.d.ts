import { vehicle } from "@/types/vehicle";
import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  password: string;
  profileImageUrl: string;
  carImageUrl: string;
  role: string;
  vehicle: vehicle[];
  isVerified: boolean;
  isAdminApproved: boolean;
}
