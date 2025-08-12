import { Package } from "lucide-react";

function RecentBookings({ bookings, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Package className="h-5 w-5 text-green-600" />
            <span>Recent Bookings</span>
          </h3>
        </div>
        <div className="p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Get most recent bookings
  const recentBookings =
    bookings
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5) || [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "in-transit":
      case "picked-up":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Package className="h-5 w-5 text-green-600" />
          <span>Recent Bookings</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  #{booking.trackingId}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.senderInfo?.city} → {booking.receiverInfo?.city}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status?.charAt(0).toUpperCase() +
                    booking.status?.slice(1)}
                </span>
                {booking.payment && (
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ${booking.payment.codAmount}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {recentBookings.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No recent bookings available
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentBookings;
