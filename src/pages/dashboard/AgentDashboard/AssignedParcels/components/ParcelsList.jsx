import { Package } from "lucide-react";
import ParcelCard from "./ParcelCard";

function ParcelsList({ parcels, onNavigate, onUpdateStatus, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (parcels.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels found</h3>
        <p className="text-gray-600">No parcels match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parcels.map((parcel) => (
        <ParcelCard
          key={parcel.id || parcel._id}
          parcel={parcel}
          onNavigate={onNavigate}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}

export default ParcelsList;
