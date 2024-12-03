import mongoose, { Schema } from "mongoose";

const GeoFencingPoints = new Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
    default: 10,
  },
});

const GeoFencing =
  mongoose.models.GeoFencing ||
  mongoose.model("GeoFencingPoints", GeoFencingPoints);

export default GeoFencing;
