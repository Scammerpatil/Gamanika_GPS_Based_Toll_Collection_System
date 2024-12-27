"use client";
import ThemeToggler from "@/components/Header/ThemeToggler";
import { SideNavItem } from "@/types/types";
import { SIDENAV_ITEMS } from "./constant";
import {
  AlignJustify,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/context";
import SideNavSkeleton from "../components/Skeletons/SideNavSkeleton";
import UserDashboardSkeleton from "../components/Skeletons/UserDashboard";
import Image from "next/image";

const SideNav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      toast.error(`Failed to logout, ${String(error)}`);
    } finally {
      router.push("/");
    }
  };

  const { user } = useUserContext();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  if (!user)
    return (
      <SideNavSkeleton>
        <UserDashboardSkeleton />
      </SideNavSkeleton>
    );

  return (
    <>
      <div className="drawer lg:drawer-open max-h-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar justify-between bg-base-300 w-full pl-10">
            <div className="lg:flex items-center justify-end space-x-2 hidden ">
              <span className="text-base font-semibold">Home</span>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm">
                    <ChevronRight />
                  </span>
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    <span className="text-base capitalize hover:text-primary transition">
                      {segment.replace(/-/g, " ")}
                    </span>
                  </Link>
                </React.Fragment>
              ))}
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <AlignJustify className="h-6 w-6" />
              </label>
            </div>

            <div className="flex-1 justify-between lg:hidden px-2">
              <h1 className="text-xl font-bold text-base-content">Gamanika</h1>
              <ThemeToggler />
            </div>

            <div className="hidden lg:block">
              <ul className="menu menu-horizontal">
                <ThemeToggler />
                <div className="flex items-center gap-4 bg-transparent">
                  <div className="dropdown dropdown-left cursor-pointer bg-transparent">
                    <div tabIndex={0} role="button" className="btn m-1 w-full">
                      <ShieldCheck size={24} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
                    >
                      {/* User Initial */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-base-conten rounded-full text-xl font-bold">
                          {user && user.fullName?.split(" ")[0][0]}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="text-lg font-semibold">
                          {user && user.fullName}
                        </span>
                      </div>
                      <hr className="my-2 border-base-content" />
                      <div className="flex flex-col">
                        <button
                          onClick={() => router.push("/account")}
                          className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                        >
                          My Account
                        </button>
                        <button
                          onClick={() => router.push("/profile")}
                          className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="text-left px-4 py-2 text-base text-dark hover:bg-base-200 transition duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex flex-1">
              <main className="flex-1 overflow-y-auto relative h-[87vh]">
                <div className="relative">
                  <div className="absolute left-0 top-0 z-[-1] bg-base-200">
                    <svg
                      width="full"
                      height="650"
                      viewBox="0 0 1440 700"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_95:1005"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1440"
                        height="969"
                      >
                        <rect width="1440" height="969" fill="#090E34"></rect>
                      </mask>
                      <g mask="url(#mask0_95:1005)">
                        <path
                          opacity="0.1"
                          d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                          fill="url(#paint0_linear_95:1005)"
                        ></path>
                        <path
                          opacity="0.1"
                          d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                          fill="url(#paint1_linear_95:1005)"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_95:1005"
                          x1="1178.4"
                          y1="151.853"
                          x2="780.959"
                          y2="453.581"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4A6CF7"></stop>
                          <stop
                            offset="1"
                            stopColor="#4A6CF7"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_95:1005"
                          x1="160.5"
                          y1="220"
                          x2="1099.45"
                          y2="1192.04"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#4A6CF7"></stop>
                          <stop
                            offset="1"
                            stopColor="#4A6CF7"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <main className="overflow-x-auto">{children}</main>
                </div>
              </main>
            </div>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <Link
              href="/teachers/dashboard"
              className="flex h-16 w-full flex-row items-center justify-center space-x-3 border-b border-base-content md:justify-start md:px-6"
            >
              <span className="h-7 w-7 rounded-lg bg-base-200">
                <Image
                  src="https://res.cloudinary.com/dt4p19dzf/image/upload/v1726761424/gamanika/logo.png"
                  alt="logo"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-xl font-bold text-base-content">
                Gamanika
              </span>
            </Link>
            <div className="flex flex-col space-y-2 mt-10 md:px-6">
              {SIDENAV_ITEMS.map((item, idx) => (
                <MenuItem key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const baseClasses =
    "flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-accent";
  const activeClasses = "bg-base-300 text-base-content";
  const inactiveClasses =
    "text-base-content hover:text-base-content hover:bg-base-100";

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`${baseClasses} ${
              pathname.includes(item.path) ? activeClasses : inactiveClasses
            }`}
          >
            <div className="flex flex-row items-center space-x-4 text-base-content">
              {item.icon}
              <span className="text-lg font-medium">{item.title}</span>
            </div>

            <div
              className={`transition-transform ${
                subMenuOpen ? "rotate-180" : ""
              } flex`}
            >
              <ChevronDown width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-4 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`block rounded-lg p-2 text-base ${
                    subItem.path === pathname
                      ? "font-semibold text-base-content"
                      : "text-base-content/2"
                  } hover:bg-accent`}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 ${
            item.path === pathname ? activeClasses : inactiveClasses
          }`}
        >
          {item.icon}
          <span className="text-lg font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
