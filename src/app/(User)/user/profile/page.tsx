"use client";
import { useUserContext } from "@/context/context";
import { useState } from "react";

const UserProfile = () => {
  const { user } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return <>Loading...</>;

  const handleEdit = () => {
    setIsEditing(true);
    // You can implement modal functionality or redirect to an edit page here
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="User Avatar"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* User Details */}
          <div className="w-full mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Full Name:</span>
              <span>{user.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone Number:</span>
              <span>{user.phone || "Not Provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Address:</span>
              <span>{user.address || "Not Provided"}</span>
            </div>
          </div>

          {/* Update Profile Button */}
          <div className="card-actions mt-6">
            <button onClick={handleEdit} className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
