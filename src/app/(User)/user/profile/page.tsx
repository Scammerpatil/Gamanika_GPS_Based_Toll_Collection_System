"use client";
import { useUserContext } from "@/context/context";
import Image from "next/image";

const UserProfile = () => {
  const { user } = useUserContext();
  // const [isEditing, setIsEditing] = useState(false);

  if (!user) return <>Loading...</>;

  // const handleEdit = () => {
  //   setIsEditing(true);
  //   // You can implement modal functionality or redirect to an edit page here
  // };

  return (
    <div className="bg-base-200 flex items-center justify-center mt-10">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={user.profileImageUrl}
                alt="User Avatar"
                height={28}
                width={28}
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
              <span className="font-semibold">User Name:</span>
              <span>{user.username || "Not Provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Number of Vehicle:</span>
              <span>{user.vehicle.length || "Not Provided"}</span>
            </div>
          </div>

          {/* Update Profile Button */}
          <div className="card-actions mt-6">
            {/* onClick={handleEdit} */}
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
