import { Package, MapPin, Clock, Phone, User, Navigation, CheckCircle } from "lucide-react";
import { formatDate } from "../../../../../utils/dateFormatter";

function ParcelCard({ parcel, onNavigate, onUpdateStatus }) {
  const customerName = parcel.receiverInfo?.name || parcel.customerName || "Unknown Recipient";
  const customerPhone = parcel.receiverInfo?.phone || parcel.customerPhone || "N/A";
  const trackingNumber = parcel.trackingId || parcel.trackingNumber || parcel.id;
  const packageType = parcel.parcelDetails?.type || parcel.packageType || "Package";
  const weight = parcel.parcelDetails?.weight || parcel.weight || "N/A";
  const deliveryAddress = parcel.receiverInfo?.address1 && parcel.receiverInfo?.city 
    ? `${parcel.receiverInfo.address1}, ${parcel.receiverInfo.city}`
    : parcel.deliveryAddress || "Address not available";
  const pickupAddress = parcel.senderInfo?.address1 && parcel.senderInfo?.city
    ? `${parcel.senderInfo.address1}, ${parcel.senderInfo.city}`
    : parcel.pickupAddress || "Pickup address not available";

  const statusColor = parcel.status?.toLowerCase() === "pending" ? "bg-red-100 text-red-800" :
                     parcel.status?.toLowerCase() === "picked up" ? "bg-yellow-100 text-yellow-800" :
                     parcel.status?.toLowerCase() === "in transit" ? "bg-blue-100 text-blue-800" :
                     parcel.status?.toLowerCase() === "delivered" ? "bg-green-100 text-green-800" :
                     "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div>
              <h3 className="font-semibold text-gray-900">{trackingNumber}</h3>
              <p className="text-sm text-gray-600">ID: {parcel.id || parcel._id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {parcel.status || "Unknown"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900">{customerName}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customerPhone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Package className="h-4 w-4 text-gray-400" />
              <span>{packageType} ({weight})</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Pickup: {formatDate(parcel.pickupSchedule)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2">Pickup Address</h4>
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span>{pickupAddress}</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span>{deliveryAddress}</span>
            </div>
          </div>
        </div>

        {(parcel.parcelDetails?.specialInstructions || parcel.specialInstructions) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-blue-900 mb-1">Special Instructions</h4>
            <p className="text-sm text-blue-800">
              {parcel.parcelDetails?.specialInstructions || parcel.specialInstructions}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
          <button 
            onClick={() => onNavigate(parcel)}
            disabled={!parcel.receiverInfo?.location?.lat || !parcel.receiverInfo?.location?.lng}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            <Navigation className="h-4 w-4" />
            <span>Navigate</span>
          </button>
          <button 
            onClick={() => onUpdateStatus(parcel)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Update Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParcelCard;
