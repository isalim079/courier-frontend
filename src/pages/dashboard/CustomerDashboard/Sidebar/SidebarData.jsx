import { Home, Package, MapPin, History } from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/customer.dashboard",
  },
  {
    id: "book-parcel",
    label: "Book Parcel",
    icon: Package,
    path: "/customer.dashboard/book-parcel",
  },
  {
    id: "track-parcel",
    label: "Track Parcel",
    icon: MapPin,
    path: "/customer.dashboard/track-parcel",
  },
  {
    id: "booking-history",
    label: "Booking History",
    icon: History,
    path: "/customer.dashboard/booking-history",
  },
];
