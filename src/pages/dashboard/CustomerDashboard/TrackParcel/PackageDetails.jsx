import { Package } from "lucide-react";

function PackageDetails({ trackingData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="h-5 w-5 text-green-600 mr-2" />
        Package Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium text-gray-900">
            {trackingData.parcelDetails?.type || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium text-gray-900">
            {trackingData.parcelDetails?.weight || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Description:</span>
          <span className="font-medium text-gray-900">
            {trackingData.parcelDetails?.description || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Special Instructions:</span>
          <span className="font-medium text-gray-900">
            {trackingData.parcelDetails?.specialInstructions || "None"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium text-gray-900">
            {trackingData.payment?.method || "N/A"}
          </span>
        </div>
        {trackingData.payment?.method === "COD" && (
          <div className="flex justify-between">
            <span className="text-gray-600">COD Amount:</span>
            <span className="font-medium text-gray-900">
              ৳{trackingData.payment?.codAmount || 0}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Pickup Schedule:</span>
          <span className="font-medium text-gray-900">
            {trackingData.pickupSchedule 
              ? new Date(trackingData.pickupSchedule).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short", 
                  day: "numeric"
                })
              : "N/A"
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
