import {
  HomeIcon,
  Car,
  User,
  FileText,
  Settings,
  CreditCard,
} from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/user/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <User width="24" height="24" />,
  },
  {
    title: "Vehicle Details",
    path: "/user/vehicle",
    icon: <Car width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Vehicle", path: "/user/vehicle/view" },
      { title: "Add Vehicle", path: "/user/vehicle/add" },
      { title: "Update Vehicle", path: "/user/vehicle/update" },
    ],
  },
  {
    title: "Documents",
    path: "/user/documents",
    icon: <FileText width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Documents", path: "/user/documents/view" },
      { title: "Upload Documents", path: "/user/documents/upload" },
    ],
  },
  {
    title: "Payments",
    path: "/user/payments",
    icon: <CreditCard width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Payment History", path: "/user/payments/history" },
      { title: "Make Payment", path: "/user/payments/make" },
    ],
  },
  {
    title: "Settings",
    path: "/user/settings",
    icon: <Settings width="24" height="24" />,
  },
];
