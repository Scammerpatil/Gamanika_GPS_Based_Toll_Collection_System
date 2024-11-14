import mongoose from "mongoose";

const TollRecordSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  initialLat: {
    type: Number,
  },
  initialLng: {
    type: Number,
  },
  finalLat: {
    type: Number,
  },
  finalLng: {
    type: Number,
  },
  totalDistanceKm: {
    type: Number,
  },
  tollAmount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TollRecord =
  mongoose.models.TollRecord || mongoose.model("TollRecord", TollRecordSchema);

export default TollRecord;
