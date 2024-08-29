"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Vehicle details interface
interface VehicleDetails {
  vehicleVerified: boolean;
  registrationNumber: string;
  registrationDate: Date;
  vehicleType: string;
  vehicleClass: string;
  chassisNo: string;
  engineNo: string;
  fuelType: string;
  manufacturingYear: number;
  vehicleColor: string;
  vehicleSeatCapacity: number;
  vehicleGrossWeight: number;
  state: string;
  purchaseDate: Date;
  ownerName: string;
  ownerFatherName?: string;
  currentFullAddress: string;
  permanentFullAddress: string;
  vehicleManufacturerName?: string;
  modelCode?: string;
  model?: string;
  bodyType?: string;
  cylindersNo?: number;
  vehicleHp?: number;
  vehicleStandingCapacity?: number;
  vehicleSleeperCapacity?: number;
  vehicleUnladenWeight?: number;
  vehicleGrossCombWeight?: number;
  wheelbase?: number;
  length?: number;
  width?: number;
  height?: number;
  laserCode?: string;
}

// User interface
interface User {
  fullName: string;
  username: string;
  role: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdminApproved: boolean;
  vehicle: VehicleDetails;
}

// Context interface
interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
}
const UserContext = createContext<UserContextProps | null>(null);
// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
