import { HomeIcon, UserCheck, Bell, FileText, Settings } from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "User Approval",
    path: "/admin/approve-users",
    icon: <UserCheck width="24" height="24" />,
  },
  {
    title: "Notices",
    path: "/admin/notices",
    icon: <Bell width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Send Notice", path: "/admin/notices/send" },
      { title: "View Notices", path: "/admin/notices/view" },
    ],
  },
  {
    title: "Toll ",
    path: "/admin/toll-management",
    icon: <FileText width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Reports", path: "/admin/toll-management/reports" },
      { title: "Manage Tolls", path: "/admin/toll-management/manage" },
    ],
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <Settings width="24" height="24" />,
  },
];
