import { User, MapPin, Package, DollarSign } from "lucide-react";

export const PACKAGE_TYPES = [
  "Documents",
  "Electronics",
  "Clothing",
  "Books",
  "Food Items",
  "Fragile Items",
  "Other",
];

export const SERVICE_TYPES = [
  { id: "standard", name: "Standard Delivery", time: "3-5 days", price: 15 },
  { id: "express", name: "Express Delivery", time: "1-2 days", price: 25 },
  { id: "overnight", name: "Overnight Delivery", time: "Next day", price: 40 },
];

export const FORM_STEPS = [
  { number: 1, title: "Sender Info", icon: User },
  { number: 2, title: "Recipient Info", icon: MapPin },
  { number: 3, title: "Package Details", icon: Package },
  { number: 4, title: "Service & Payment", icon: DollarSign },
];
