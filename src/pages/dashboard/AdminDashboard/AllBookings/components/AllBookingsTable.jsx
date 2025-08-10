import { Edit, Trash2, Package, MapPin, User } from 'lucide-react';
import { formatDate } from '../../../../../utils/dateFormatter';

function AllBookingsTable({ 
  bookings, 
  onUpdateAgent, 
  onDeleteBooking 
}) {
  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in-transit':
      case 'in transit':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Booking ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Route</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Agent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Pickup Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings?.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-gray-900">{booking?.trackingId}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {booking.senderInfo?.name || 'N/A'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {booking.customer?.email || 'N/A'}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3 text-green-500" />
                      <span className="text-gray-600">
                        {booking.senderInfo?.address1 || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3 text-red-500" />
                      <span className="text-gray-600">
                        {booking.receiverInfo?.address1 || 'N/A'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={getStatusBadge(booking.status)}>
                    {booking.status || 'pending'}
                  </span>
                </td>
              
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">
                    ${booking?.payment?.codAmount || 'N/A'}
                  </span>
                  <p className="text-sm text-gray-500">
                    {booking.parcelDetails ? `${booking.parcelDetails?.weight}` : 'N/A'}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <span className={
                    !booking.assignedAgent?.name ? 'text-red-600' : 'text-gray-900'
                  }>
                    {booking.assignedAgent?.name || 'Unassigned'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">
                    {formatDate(booking?.pickupSchedule)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onUpdateAgent(booking)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                      title="Assign Agent"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteBooking(booking._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Booking"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBookingsTable;
