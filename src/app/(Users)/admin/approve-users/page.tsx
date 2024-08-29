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
import mongoose from "mongoose";

type User = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  isAdminApproved: boolean;
  vehicle: {
    model: string;
    img: string;
    registrationNumber: string;
    state: string;
  };
};

const AdminUserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [cardDetails, setCardDetails] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = axios.get("/api/vehicle/getAllVehicles");
        toast.promise(
          res,
          {
            loading: "Fetching users...",
            success: (data) => {
              setUsers(data.data);
              return "Users fetched successfully";
            },
            error: "Error fetching users",
          },
          {
            style: {
              minWidth: "250px",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (user: User) => {
    try {
      const response = axios.post("/api/updateStatus", {
        registrationNumber: user.vehicle.registrationNumber,
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

  const handleReject = async (user: User) => {
    try {
      const response = axios.post("/api/updateStatus", {
        registrationNumber: user.vehicle.registrationNumber,
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

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setCardDetails(!cardDetails);
  };

  return (
    <div className="min-h-screen max-w-full px-4 py-6 bg-transparent">
      <h1 className="mb-8 text-4xl font-bold text-center dark:text-zinc-200">
        User Management
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className={`${
            cardDetails ? "lg:w-4/6" : "w-full"
          } rounded-lg shadow-lg dark:bg-transparent bg-white h-full overflow-x-auto`}
        >
          <Table aria-label="Approve Users" className="min-w-full">
            <TableHeader className="bg-white">
              <TableColumn className="text-left text-gray-600 font-medium">
                #
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                User
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                Registration Number
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                Car Name
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                State
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                Admin Approved
              </TableColumn>
              <TableColumn className="text-left text-gray-600 font-medium">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user: User, index) => (
                  <TableRow
                    key={user._id.toString()}
                    className="hover:bg-gray-700"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <User
                        name={user.fullName}
                        avatarProps={{
                          src:
                            user.vehicle?.img ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.fullName
                            )}&background=random&rounded=true&size=128` ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8Hg7W_MXeeKhuUBPVB7FMrYOMhIUHdllpQ&s",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {user.vehicle?.registrationNumber || "N/A"}
                    </TableCell>
                    <TableCell>{user.vehicle?.model || "N/A"}</TableCell>
                    <TableCell>{user.vehicle?.state || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        size="sm"
                        variant="flat"
                        color={user.isAdminApproved ? "success" : "warning"}
                      >
                        {user.isAdminApproved ? "Approved" : "Pending"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          className="text-blue-500 flex flex-col items-center gap-1"
                          onClick={() => handleViewDetails(user)}
                        >
                          <Eye className="w-5 h-5" />
                          <span className="text-xs">View</span>
                        </Button>

                        {!user.isAdminApproved && (
                          <>
                            <Button
                              className="text-green-500 flex flex-col items-center gap-1"
                              onClick={() => handleApprove(user)}
                            >
                              <CircleCheck className="w-5 h-5" />
                              <span className="text-xs">Approve</span>
                            </Button>

                            <Button
                              className="text-red-500 flex flex-col items-center gap-1"
                              onClick={() => handleReject(user)}
                            >
                              <XCircle className="w-5 h-5" />
                              <span className="text-xs">Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                  <TableCell className="text-center text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {cardDetails && selectedUser ? (
          <CardDetails vehicle={selectedUser.vehicle} user={selectedUser} />
        ) : null}
      </div>
    </div>
  );
};

export default AdminUserTable;
