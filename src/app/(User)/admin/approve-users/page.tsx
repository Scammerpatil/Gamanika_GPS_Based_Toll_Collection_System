"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";
import { CircleCheck, Eye, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import CardDetails from "@/components/CardDetails";
import { User as UserType } from "@/types/user";

const AdminUserTable = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [cardDetails, setCardDetails] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = axios.get("/api/vehicle/getAllVehicles");
        toast.promise(res, {
          loading: "Fetching users...",
          success: (data) => {
            setUsers(data.data);
            return "Users fetched successfully";
          },
          error: "Error fetching users",
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (user: UserType) => {
    try {
      const response = axios.post("/api/user/updateStatus", {
        _id: user._id,
        status: true,
      });
      toast.promise(response, {
        loading: "Approving user...",
        success: "User approved successfully",
        error: "Failed to approve user",
      });
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  const handleReject = async (user: UserType) => {
    try {
      const response = axios.post("/api/user/updateStatus", {
        _id: user._id,
        status: false,
      });
      toast.promise(response, {
        loading: "Rejecting user...",
        success: "User rejected successfully",
        error: "Failed to reject user",
      });
    } catch (error) {
      console.error("Failed to reject user:", error);
    }
  };

  const handleViewDetails = (user: UserType) => {
    setSelectedUser(user);
    setCardDetails(!cardDetails);
  };

  return (
    <div className="max-w-full px-4 py-6 bg-transparent">
      <h1 className="mb-8 text-4xl font-bold text-center dark:text-zinc-200">
        User Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user: UserType) => (
            <div
              key={user._id?.toString()}
              className="card w-full bg-white shadow-xl dark:bg-base-200"
            >
              <figure className="p-4">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8Hg7W_MXeeKhuUBPVB7FMrYOMhIUHdllpQ&s"
                  }
                  alt="User Avatar"
                  className="rounded-full w-32 h-32 mx-auto"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-center">{user.fullName}</h2>
                <p className="text-center text-base-content">
                  {user.vehicle[0].model}
                </p>
                <p className="text-center text-gray-500">
                  {user.vehicle[0].registrationNumber}
                </p>
                <p className="text-center text-gray-400">
                  {user.vehicle[0].state}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="badge badge-sm badge-primary">
                    {user.isAdminApproved ? "Approved" : "Pending"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-ghost text-blue-500"
                      onClick={() => handleViewDetails(user)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {!user.isAdminApproved && (
                      <>
                        <button
                          className="btn btn-ghost text-green-500"
                          onClick={() => handleApprove(user)}
                        >
                          <CircleCheck className="w-5 h-5" />
                        </button>

                        <button
                          className="btn btn-ghost text-red-500"
                          onClick={() => handleReject(user)}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>

      {cardDetails && selectedUser ? (
        <CardDetails vehicle={selectedUser.vehicle} user={selectedUser} />
      ) : null}
    </div>
  );
};

export default AdminUserTable;
