import mongoose, { Schema } from "mongoose";

// Enums for VehicleType and FuelType
enum VehicleType {
  CAR = "Car",
  JEEP = "Jeep",
  VAN = "Van",
  LIGHT_MOTOR_VEHICLE = "Light Motor Vehicle",
  LIGHT_COMMERCIAL_VEHICLE = "Light Commercial Vehicle",
  MINI_BUS = "Mini Bus",
  BUS = "Bus",
  TRUCK_TWO_AXLES = "Truck (Two axles)",
  THREE_AXLE_COMMERCIAL_VEHICLE = "Three-axle commercial vehicle",
  HCM_EME_MAV = "Heavy Construction Machinery or Earth Moving Equipment or Multi Axle Vehicle (four to six axles)",
  OVERSIZED_VEHICLE = "Oversized Vehicle (seven or more axles)",
}

enum FuelType {
  PETROL = "Petrol",
  DIESEL = "Diesel",
  CNG = "CNG",
  ELECTRIC = "Electric",
  HYBRID = "Hybrid",
}

// VehicleDetails schema embedded within the User schema
const UserSchema: Schema = new Schema({
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
  vehicle: {
    vehicleNumberPlate: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
    vehicleClass: {
      type: String,
      required: true,
    },
    chassisNo: {
      type: String,
      required: true,
    },
    engineNo: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: Object.values(FuelType),
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    vehicleSeatCapacity: {
      type: Number,
      required: true,
    },
    vehicleGrossWeight: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
});

// Exporting only the User model
const UserModel =
  mongoose.models.UserModel || mongoose.model("User", UserSchema);

export default UserModel;
