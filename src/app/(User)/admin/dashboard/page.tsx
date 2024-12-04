"use client";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { User, Car, TrendingUp, CreditCard, ClipboardList } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const stats = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Total Users",
      value: 120,
    },
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: "Registered Vehicles",
      value: 75,
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Active Tolls",
      value: 20,
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Total Revenue",
      value: "₹50K",
    },
  ];

  // Dummy data for charts
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [10, 20, 15, 30, 40, 50],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const vehicleTypeData = {
    labels: ["Cars", "Bikes", "Trucks"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#4ade80", "#facc15", "#f43f5e"],
        hoverBackgroundColor: ["#16a34a", "#eab308", "#dc2626"],
      },
    ],
  };

  return (
    <div className="p-6 bg-transparent">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-200 shadow-lg">
            <div className="card-body flex items-center space-x-4">
              {stat.icon}
              <div>
                <h2 className="card-title">{stat.title}</h2>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center">User Growth</h2>
            <Bar data={userGrowthData} />
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center">Vehicle Distribution</h2>
            <Doughnut data={vehicleTypeData} />
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="mt-8">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <ClipboardList className="text-primary h-6 w-6" />
              <h2 className="card-title">Manage Users and Vehicles</h2>
            </div>
            <p className="text-base-content/80">
              Access detailed information about registered users and their
              vehicles. Use this panel to approve or reject user requests,
              monitor toll statuses, and more.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Go to Management</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
