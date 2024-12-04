import { User } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdminApproved: {
      type: Boolean,
      default: false,
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
    carImageUrl: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    vehicle: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this as unknown as User;
  const name = user.fullName.toLowerCase().split(" ");
  user.fullName = name
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  next();
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
