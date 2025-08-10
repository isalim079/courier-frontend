import {
  LayoutDashboard,
  Package,
  Users,
  UserCheck,
  BarChart3,
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin.dashboard",
  },
  {
    id: "bookings",
    label: "All Bookings",
    icon: Package,
    path: "/admin.dashboard/bookings",
  },
  {
    id: "assign-agents",
    label: "Assign Agents",
    icon: UserCheck,
    path: "/admin.dashboard/assign-agents",
  },
  {
    id: "users",
    label: "All Users",
    icon: Users,
    path: "/admin.dashboard/users",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/admin.dashboard/reports",
  },
];
