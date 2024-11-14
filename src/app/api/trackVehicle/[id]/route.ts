import dbConfig from "@/middlewares/db.config";
import Vehicle from "@/models/Vehicle";
import TollRecord from "@/models/TollRecord";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

let initialLocation = {
  lat: 0,
  lng: 0,
};
const geofenceLat = 40.7128;
const geofenceLon = -74.006;
const geofenceRadius = 10;

export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const id = pathname.split("/").pop();
  const { lat, lng } = await req.json();
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    return NextResponse.json(
      { message: "Vehicle not found." },
      { status: 404 }
    );
  }
  console.log("Vehicle", vehicle);

  const distanceFromCenter = haversine(geofenceLat, geofenceLon, lat, lng);

  if (distanceFromCenter <= geofenceRadius) {
    if (!initialLocation) {
      initialLocation = { lat, lng };
      return NextResponse.json(
        {
          message: "Device entered the geofence. Starting point saved.",
          status: "inside",
        },
        { status: 200 }
      );
    } else {
      // Calculate the distance from the starting point
      const distanceFromStart = haversine(
        initialLocation.lat,
        initialLocation.lng,
        lat,
        lng
      );
      return NextResponse.json({
        message: "Device is inside the geofence.",
        status: "inside",
        distanceFromStart,
      });
    }
  } else {
    if (initialLocation) {
      const totalDistanceKm =
        haversine(initialLocation.lat, initialLocation.lng, lat, lng) / 1000;
      if (totalDistanceKm < 1) {
        return NextResponse.json({
          message: "Distance is less than 1 km. No toll calculated.",
          status: "outside",
        });
      }
      const tollAmount = totalDistanceKm * vehicle.tollRate;
      console.log("Toll Amount", tollAmount, totalDistanceKm);
      if (isNaN(totalDistanceKm) || isNaN(tollAmount)) {
        console.error("Invalid data", { totalDistanceKm, tollAmount });
        return NextResponse.json("Invalid data", { status: 400 });
      }

      // Create a new TollRecord to store the toll details
      const tollRecord = new TollRecord({
        vehicleId: vehicle._id,
        initialLat: initialLocation.lat,
        initialLng: initialLocation.lng,
        finalLat: lat,
        finalLng: lng,
        totalDistanceKm,
        tollAmount,
        date: new Date(),
      });

      await tollRecord.save();

      initialLocation = {
        lat: 0,
        lng: 0,
      };

      return NextResponse.json({
        message: "Device exited the geofence. Toll calculated.",
        tollAmount,
        totalDistanceKm,
        status: "outside",
      });
    }
  }
}

// Haversine formula to calculate distance between two points in meters
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance * 1000; // Return distance in meters
}
