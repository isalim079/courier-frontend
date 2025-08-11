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
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Calculate estimated delivery (pickup + 5 days)
  const getEstimatedDelivery = () => {
    if (trackingData.status === "Delivered") {
      return new Date(trackingData.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric"
      });
    }
    
    if (trackingData.pickupSchedule) {
      const pickup = new Date(trackingData.pickupSchedule);
      const estimated = new Date(pickup);
      estimated.setDate(pickup.getDate() + 5);
      return estimated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric"
      });
    }
    
    return "TBD";
  };

  // Get current location description
  const getCurrentLocation = () => {
    if (trackingData.status === "Delivered") {
      return `Delivered to ${trackingData.receiverInfo.name}`;
    }
    
    if (trackingData.status === "In Transit" && trackingData.agentLocation) {
      return `Agent Location: ${trackingData.agentLocation.lat.toFixed(4)}, ${trackingData.agentLocation.lng.toFixed(4)}`;
    }
    
    if (trackingData.status === "Pending" || trackingData.status === "Pending Pickup") {
      return `Awaiting pickup from ${trackingData.senderInfo.city}`;
    }
    
    return "Location updating...";
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
              {trackingData.trackingId}
            </h2>
            <p className="text-gray-600">
              {trackingData.parcelDetails?.description || `${trackingData.parcelDetails?.type} parcel`}
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
            {getCurrentLocation()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">
            {trackingData.status === "Delivered"
              ? "Delivered At:"
              : "Estimated Delivery:"}
          </p>
          <p className="font-medium text-gray-900">
            {getEstimatedDelivery()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Assigned Agent:</p>
          <p className="font-medium text-gray-900">
            {trackingData.assignedAgent?.name || "Not assigned yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackingStatusCard;
