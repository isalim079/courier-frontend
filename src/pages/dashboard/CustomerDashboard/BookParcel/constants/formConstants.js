import { User, MapPin, Package, DollarSign } from "lucide-react";

export const PARCEL_TYPES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" }
];

export const WEIGHT_RANGES = [
  { value: "0-1", label: "0-1 kg" },
  { value: "1-3", label: "1-3 kg" },
  { value: "3-5", label: "3-5 kg" },
  { value: "5-10", label: "5-10 kg" },
  { value: "10+", label: "Above 10 kg" }
];

export const FORM_STEPS = [
  { number: 1, title: "Sender Info", icon: User },
  { number: 2, title: "Receiver Info", icon: MapPin },
  { number: 3, title: "Parcel Details", icon: Package },
  { number: 4, title: "Payment & Schedule", icon: DollarSign }
];
