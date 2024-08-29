"use client";
import { useState, useEffect } from "react";
import ThemeToggler from "@/components/Header/ThemeToggler";
import { ChevronRight, Key, LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/hover";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const DesktopHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user.fullName);
    if (user?.fullName) {
      axios
        .get(
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.fullName
          )}&background=random&rounded=true&size=128`
        )
        .then((response) => setProfilePic(response.request.responseURL));
    }
  }, []);

  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    toast.promise(axios.get("/api/auth/logout"), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });
    router.push("/signin");
  };

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-end">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              } `}
            >
              <Image
                src="/images/logo/logo-2.svg"
                alt="logo"
                width={140}
                height={30}
                className="w-full dark:hidden"
              />
              <Image
                src="/images/logo/logo.svg"
                alt="logo"
                width={140}
                height={30}
                className="hidden w-full dark:block"
              />
            </Link>
          </div>
          <div className="hidden md:flex w-full items-center justify-center px-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    className={`text-base font-semibold capitalize hover:underline ${
                      index === pathSegments.length - 1 ? "text-gray-500" : ""
                    }`}
                  >
                    {segment}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggler />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700">
                    <span className="text-white">SP</span>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 rounded-lg bg-white p-4 shadow-lg dark:bg-[#1e232e]">
                <div className="flex flex-col items-center">
                  <Image
                    src={profilePic || "/default-profile.png"}
                    height={50}
                    width={50}
                    alt="Profile Picture"
                    className="mb-2 rounded-full"
                  />
                  <DropdownMenuLabel className="text-base font-semibold">
                    Welcome, {user}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="-ml-10">
                    <DropdownMenuItem className="hover:bg-zinc-500 rounded">
                      <User className="mr-2 h-4 w-4" />
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-500 rounded">
                      <Key className="mr-2 h-4 w-4" />
                      <Link href="/profile">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer hover:bg-zinc-500 rounded"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
