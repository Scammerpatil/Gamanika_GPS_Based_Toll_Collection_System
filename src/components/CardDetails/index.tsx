import React from "react";
import { User, Car, Settings } from "lucide-react";
import Image from "next/image";
import { User as UserType } from "@/types/user";
import { Vehicle } from "@/types/vehicle";

const CardDetails = ({
  vehicle,
  user,
}: {
  vehicle: Vehicle;
  user: UserType;
}) => {
  return (
    <div className="w-full">
      <input
        type="checkbox"
        id="card-details-dialog"
        className="modal-toggle"
      />
      <div className="modal" id="car-details">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="text-center text-3xl font-bold uppercase py-3">
            Vehicle Details
          </h3>
          <div className="flex justify-center">
            <Image
              src={user.carImageUrl}
              alt="Vehicle Image"
              width={120}
              height={120}
              className="m-auto rounded-full"
            />
          </div>
          <div className="mt-5">
            <h4 className="text-xl font-bold">{vehicle.model || "N/A"}</h4>
            <small className="text-gray-500">
              Registration Number: {vehicle.registrationNumber}
            </small>
            <div className="divider"></div>
          </div>

          <div className="py-4">
            <h1 className="flex gap-2 pb-2 text-xl font-semibold">
              <Car /> Vehicle Specifications
            </h1>
            <p className="py-1 text-sm">Model: {vehicle.model || "N/A"}</p>
            <p className="py-1 text-sm">
              Engine Capacity: {vehicle.body || "N/A"}
            </p>
            <p className="py-1 text-sm">
              Fuel Type: {vehicle.fuelType || "N/A"}
            </p>
            <p className="py-1 text-sm">
              Vehicle Class: {vehicle.vehicleClass || "N/A"}
            </p>
            <div className="divider"></div>
          </div>

          <div className="py-4">
            <h1 className="flex gap-2 pb-1 text-xl font-semibold">
              <User /> Owner Information
            </h1>
            <p className="py-1 text-sm">Owner: {user.fullName || "N/A"}</p>
            <p className="py-1 text-sm">State: {vehicle.state || "N/A"}</p>
            <p className="py-1 text-sm">
              Pincode: {vehicle.chassisNo || "N/A"}
            </p>
            <div className="divider"></div>
          </div>

          <div className="py-4">
            <h1 className="flex gap-2 pb-1 text-xl font-semibold">
              <Settings /> Verification & Status
            </h1>
            <p className="py-1 text-sm">
              Admin Approved: {user.isAdminApproved ? "Yes" : "No"}
            </p>
          </div>

          <div className="modal-action">
            <label htmlFor="card-details-dialog" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
