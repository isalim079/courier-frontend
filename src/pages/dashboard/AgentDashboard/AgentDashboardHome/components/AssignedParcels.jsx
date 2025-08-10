import { 
  MapPin, 
  Clock, 
  Package,
  Phone,
  Eye,
  Navigation 
} from 'lucide-react';
import { formatDate } from '../../../../../utils/dateFormatter';

function AssignedParcels({ parcels, loading, onNavigate, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': 
      case 'pending pickup': 
        return 'bg-red-100 text-red-800';
      case 'in transit': 
      case 'picked up':
        return 'bg-blue-100 text-blue-800';
      case 'delivered': 
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-gray-100 text-gray-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2 sm:mb-0"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col gap-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show only last 3 parcels
  const recentParcels = parcels?.slice(0, 3) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
            Recent Assigned Parcels
          </h3>
          <div className="text-sm text-gray-500">
            {recentParcels.length} recent assignments
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {recentParcels.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No parcels assigned yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentParcels.map((parcel) => (
              <div key={parcel.id || parcel._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {parcel.receiverInfo?.name || 'Unknown Recipient'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ID: {parcel.trackingId || parcel.id}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(parcel.status)}`}>
                        {parcel.status || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">
                          {parcel.receiverInfo?.address1 && parcel.receiverInfo?.city 
                            ? `${parcel.receiverInfo.address1}, ${parcel.receiverInfo.city}`
                            : 'Address not available'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{parcel.receiverInfo?.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Pickup: {formatDate(parcel.pickupSchedule)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span>{parcel.parcelDetails?.type || 'Package'} - {parcel.parcelDetails?.weight || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <button 
                      onClick={() => onViewDetails(parcel)}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Update</span>
                    </button>
                    <button 
                      onClick={() => onNavigate(parcel)}
                      disabled={!parcel.receiverInfo?.location?.lat || !parcel.receiverInfo?.location?.lng}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Navigate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignedParcels;
