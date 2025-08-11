import { Package } from "lucide-react";

function TrackingStatusCard({ trackingData }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Pending Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {trackingData.id}
            </h2>
            <p className="text-gray-600">
              {trackingData.package.description}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
            trackingData.status
          )}`}
        >
          {trackingData.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Current Location:</p>
          <p className="font-medium text-gray-900">
            {trackingData.currentLocation}
          </p>
        </div>
        <div>
          <p className="text-gray-500">
            {trackingData.status === "Delivered"
              ? "Delivered At:"
              : "Estimated Delivery:"}
          </p>
          <p className="font-medium text-gray-900">
            {trackingData.deliveredAt || trackingData.estimatedDelivery}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Service Type:</p>
          <p className="font-medium text-gray-900">
            {trackingData.service.type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackingStatusCard;
