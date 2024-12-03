"use client";
import ToastContainer from "@/components/ToastContainer";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { UserProvider, useUserContext } from "@/context/context";
import { useEffect } from "react";
import axios from "axios";
import "@/styles/index.css";
import SideNav from "./SideNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <AppContent>{children}</AppContent>
    </UserProvider>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const response = await axios.get("/api/user/verifyUser");
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
        setUser(null);
        router.push("/");
      }
    };
    getUserFromToken();
  }, [router]);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>Gamanika | R. C. Patel Institute of Technology</title>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer />
        <ScrollToTop />
        <SideNav children={children} router={router} />
      </body>
    </html>
  );
}
