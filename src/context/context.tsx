"use client";

import { User } from "@/types/user";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
const UserContext = createContext<UserContextProps | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
