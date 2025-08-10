import { Package, MapPin } from 'lucide-react';
import { formatDate } from '../../../../../utils/dateFormatter';

function UnassignedBookings({ 
  bookings, 
  selectedBooking, 
  onSelectBooking 
}) {
  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return priority?.toLowerCase() === 'express' 
      ? `${baseClasses} bg-orange-100 text-orange-800`
      : `${baseClasses} bg-gray-100 text-gray-800`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Package className="h-5 w-5 text-orange-600" />
          <span>Unassigned Bookings ({bookings.length})</span>
        </h2>
      </div>
      
      <div className="p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No unassigned bookings found</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedBooking?.id === booking.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelectBooking(booking)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.trackingId}</h3>
                    <p className="text-sm text-gray-600">{booking.customer?.name || booking.senderInfo?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${booking.payment?.codAmount || 'N/A'}</p>
                    <span className={getPriorityBadge(booking.priority)}>
                      {booking.priority || 'standard'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{booking.senderInfo?.address1 || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">{booking.receiverInfo?.address1 || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>{booking.parcelDetails?.weight || 'N/A'}</span>
                    <span>Status: {booking.status || 'Pending'}</span>
                    <span>{formatDate(booking.pickupSchedule)}</span>
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

export default UnassignedBookings;
