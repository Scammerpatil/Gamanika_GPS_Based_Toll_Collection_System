"use client";
import { useUserContext } from "@/context/context";
import { Vehicle } from "@/types/vehicle";
import { UserIcon, Car, CreditCard, ShieldCheck } from "lucide-react";
import React from "react";

const UserDashboard = () => {
  const { user } = useUserContext();
  if (!user) return <>Loading...</>;

  return (
    <div className="bg-transparent flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <UserIcon className="text-primary h-6 w-6" />
              <h2 className="card-title">User Information</h2>
            </div>
            <p>
              <strong>Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Joined:</strong> {user.username || "Not available"}
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Card 2 - Vehicle Information */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <Car className="text-primary h-6 w-6" />
              <h2 className="card-title">Vehicle Information</h2>
            </div>
            {user.vehicle.length > 0 ? (
              user.vehicle.map((vehicle: Vehicle, index) => (
                <React.Fragment key={index}>
                  <p>
                    <strong>Model:</strong>{" "}
                    <span className="capitalize">{vehicle.model}</span>
                  </p>
                  <p>
                    <strong>Registration No:</strong>{" "}
                    <span className="capitalize">
                      {vehicle.registrationNumber}
                    </span>
                  </p>
                  <p>
                    <strong>Fuel Type:</strong>{" "}
                    <span className="capitalize">{vehicle.fuelType}</span>
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    <span className="capitalize">
                      {vehicle.vehicleCategory}
                    </span>
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-secondary btn-sm">
                      View Details
                    </button>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p>No vehicle information available</p>
            )}
          </div>
        </div>

        {/* Card 3 - Toll Information */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <CreditCard className="text-primary h-6 w-6" />
              <h2 className="card-title">Toll Information</h2>
            </div>
            <p>
              <strong>Toll Rate:</strong> ₹100
            </p>
            <p>
              <strong>Last Paid:</strong> 15th Aug 2024
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="badge badge-success">Active</span>
            </p>
            <p>
              <strong>Upcoming Due:</strong> 20th Oct 2024
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-accent btn-sm">Payment History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
