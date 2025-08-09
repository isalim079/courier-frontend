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
    path: "/dashboard",
  },
  {
    id: "bookings",
    label: "All Bookings",
    icon: Package,
    path: "/dashboard/bookings",
  },
  {
    id: "assign-agents",
    label: "Assign Agents",
    icon: UserCheck,
    path: "/dashboard/assign-agents",
  },
  {
    id: "users",
    label: "All Users",
    icon: Users,
    path: "/dashboard/users",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/dashboard/reports",
  },
];
