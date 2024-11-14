import mongoose, { Schema } from "mongoose";

const VehicleSchema = new Schema({
  uniqueNumber:{
    type:String,
    required:true,
    unique:true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  tollRate: {
    type: Number,
    required: true,
  },
  vehicleClass: {
    type: String,
    required: true,
  },
  vehicleCategory: {
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
  },
  taxMode: {
    type: String,
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
  },
  vehicleGrossWeight: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  vehicleManufacturerName: {
    type: String,
  },
  modelCode: {
    type: String,
  },
  model: {
    type: String,
  },
  body: {
    type: String,
  },
  cylindersNo: {
    type: Number,
  },
  vehicleHp: {
    type: Number,
  },
  vehicleUnladenWeight: {
    type: Number,
  },
  vehicleGrossCombWeight: {
    type: Number,
  },
  wheelBase: {
    type: Number,
  },
  permitDetails: {
    permitType: String,
    permitValidUpto: Date,
  },
});

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
