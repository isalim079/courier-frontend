import { Package, MapPin, User, Phone, Calendar, Eye } from "lucide-react";

function DeliveryCard({ delivery }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in transit': 
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': 
        return 'bg-red-100 text-red-800 border-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <Package className="h-5 w-5 text-gray-400" />
            <div>
              <h3 className="font-semibold text-gray-900">{delivery.trackingId}</h3>
              <p className="text-sm text-gray-600">ID: {delivery.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(delivery.status)}`}>
              {delivery.status}
            </span>
            {delivery.payment?.codAmount && (
              <span className="text-sm font-medium text-green-600">
                COD: ${delivery.payment.codAmount}
              </span>
            )}
          </div>
        </div>

        {/* Customer and Package Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900">{delivery.customer?.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Package className="h-4 w-4 text-gray-400" />
              <span>{delivery.parcelDetails?.type} - {delivery.parcelDetails?.weight}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Pickup: {formatDate(delivery.pickupSchedule)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{delivery.receiverInfo?.phone}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Payment Method</span>
            <span className="font-medium text-gray-900">{delivery.payment?.method}</span>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-1">Pickup Address</h4>
            <div className="flex items-start space-x-2 text-sm text-blue-800">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p>{delivery.senderInfo?.address1}</p>
                <p>{delivery.senderInfo?.city}, {delivery.senderInfo?.postalCode}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="font-medium text-green-900 mb-1">Delivery Address</h4>
            <div className="flex items-start space-x-2 text-sm text-green-800">
              <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p>{delivery.receiverInfo?.address1}</p>
                <p>{delivery.receiverInfo?.city}, {delivery.receiverInfo?.postalCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {delivery.parcelDetails?.description && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-yellow-900 mb-1">Special Instructions</h4>
            <p className="text-sm text-yellow-800">{delivery.parcelDetails.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryCard;
