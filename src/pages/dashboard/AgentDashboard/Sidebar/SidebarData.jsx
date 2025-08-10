import {
  LayoutDashboard,
  Package,
  CheckCircle,
  MapPin,
  Route,
  Clock,
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/agent.dashboard",
  },
  {
    id: "assigned-parcels",
    label: "Assigned Parcels",
    icon: Package,
    path: "/agent.dashboard/assigned-parcels",
  },

  {
    id: "route-map",
    label: "Optimized Routes",
    icon: Route,
    path: "/agent.dashboard/route-map",
  },
  {
    id: "delivery-history",
    label: "Delivery History",
    icon: Clock,
    path: "/agent.dashboard/delivery-history",
  },
];
