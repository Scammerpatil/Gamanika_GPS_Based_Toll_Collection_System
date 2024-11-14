import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Contact, User, Car, MapPin, Settings } from "lucide-react";

const CardDetails = (props: any) => {
  const { vehicle, user } = props;
  const [data, setData] = useState(vehicle || user);

  useEffect(() => {
    setData(vehicle || user);
  }, [vehicle, user]);

  if (!data) return null;

  return (
    <Card className="h-full w-2/6 rounded-md bg-zinc-200 p-5 py-4 dark:bg-slate-800">
      <p className="text-center text-3xl font-bold uppercase py-3">
        Vehicle Details
      </p>
      <img
        src={data.vehicleImage}
        alt="Vehicle Image"
        width={120}
        className="m-auto rounded-full"
      />
      <CardHeader className="flex-col items-start px-4 pb-1 pt-2">
        <h4 className="text-xl font-bold">{data.model || "N/A"}</h4>
        <small className="text-default-500">
          Registration Number: {data.registrationNumber}
        </small>
        <Divider className="mt-3" />
      </CardHeader>
      <CardBody className="overflow-visible">
        <div>
          <div className="flex-col">
            <h1 className="flex gap-2 pb-2 text-xl font-semibold">
              <Car /> Vehicle Specifications
            </h1>
            <p className="py-1 text-sm">Model: {data.model || "N/A"}</p>
            <p className="py-1 text-sm">
              Engine Capacity: {data.engineCapacity || "N/A"}
            </p>
            <p className="py-1 text-sm">Fuel Type: {data.fuelType || "N/A"}</p>
            <p className="py-1 text-sm">
              Vehicle Class: {data.vehicleClass || "N/A"}
            </p>
          </div>
          <Divider className="py-2" />
          <div className="flex-col">
            <h1 className="flex gap-2 pb-1 text-xl font-semibold">
              <User /> Owner Information
            </h1>
            <p className="py-1 text-sm">Owner: {user.fullName || "N/A"}</p>
            <p className="py-1 text-sm">State: {user.vehicle.state || "N/A"}</p>
            <p className="py-1 text-sm">
              Pincode: {user.vehicle.pincode || "N/A"}
            </p>
          </div>
          <Divider className="py-2" />
          <div className="flex-col">
            <h1 className="flex gap-2 pb-1 text-xl font-semibold">
              <Settings /> Verification & Status
            </h1>
            <p className="py-1 text-sm">
              Admin Approved: {user.isAdminApproved ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDetails;
