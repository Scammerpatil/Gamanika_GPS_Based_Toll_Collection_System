"use client";

const UserDashboardSkeleton = () => {
  return (
    <div className="max-h-screen bg-transparent flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Skeleton Card 1 - User Information */}
        <div className="card w-96 bg-base-100 shadow-xl animate-pulse">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <div className="h-6 w-32 bg-base-300 rounded"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-40 bg-base-300 rounded"></div>
              <div className="h-4 w-32 bg-base-300 rounded"></div>
              <div className="h-4 w-28 bg-base-300 rounded"></div>
            </div>
            <div className="card-actions justify-end mt-4">
              <div className="h-8 w-20 bg-primary rounded"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Card 2 - Vehicle Information */}
        <div className="card w-96 bg-base-100 shadow-xl animate-pulse">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <div className="h-6 w-36 bg-base-300 rounded"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-40 bg-base-300 rounded"></div>
              <div className="h-4 w-32 bg-base-300 rounded"></div>
              <div className="h-4 w-28 bg-base-300 rounded"></div>
              <div className="h-4 w-36 bg-base-300 rounded"></div>
            </div>
            <div className="card-actions justify-end mt-4">
              <div className="h-8 w-24 bg-secondary rounded"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Card 3 - Toll Information */}
        <div className="card w-96 bg-base-100 shadow-xl animate-pulse">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <div className="h-6 w-32 bg-base-300 rounded"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-40 bg-base-300 rounded"></div>
              <div className="h-4 w-32 bg-base-300 rounded"></div>
              <div className="h-4 w-28 bg-base-300 rounded"></div>
              <div className="h-4 w-36 bg-base-300 rounded"></div>
            </div>
            <div className="card-actions justify-end mt-4">
              <div className="h-8 w-32 bg-accent rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSkeleton;
