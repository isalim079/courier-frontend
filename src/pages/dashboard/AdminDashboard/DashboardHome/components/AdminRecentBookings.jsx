import {
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";

function AdminRecentBookings({ bookings, loading }) {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in transit":
      case "in-transit":
        return <Activity className="h-4 w-4 text-blue-500" />;
      case "pending":
      case "pending pickup":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "delivered":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "in transit":
      case "in-transit":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "pending":
      case "pending pickup":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-32"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-5 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="p-12 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">No bookings have been made yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <span className="text-sm text-gray-500">
            Showing {Math.min(bookings.length, 10)} of {bookings.length} bookings
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {bookings.slice(0, 10).map((booking) => (
            <div
              key={booking.trackingId || booking._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(booking.status)}
                <div>
                  <p className="font-medium text-gray-900">
                    {booking.trackingId || booking._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.receiverInfo?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.senderInfo?.city || "N/A"} → {booking.receiverInfo?.city || "N/A"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${booking.payment?.codAmount?.toFixed(2) || "0.00"}
                </p>
                <span className={getStatusBadge(booking.status)}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminRecentBookings;
