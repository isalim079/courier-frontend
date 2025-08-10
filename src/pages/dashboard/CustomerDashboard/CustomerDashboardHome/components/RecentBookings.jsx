import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecentBookings({ bookings, loading }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
      case "Pending Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Add ordinal suffix to day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  const getDateLabel = (booking) => {
    if (booking.status === "Delivered") return "Delivered At:";
    if (booking.status === "In Transit") return "Estimated Delivery:";
    if (booking.status === "Pending" || booking.status === "Pending Pickup")
      return "Scheduled Pickup:";
    return "Date:";
  };

  const getDateValue = (booking) => {
    if (booking.status === "Delivered") return formatDate(booking.deliveredAt);
    if (booking.status === "In Transit")
      return formatDate(booking.estimatedDelivery);
    if (booking.status === "Pending" || booking.status === "Pending Pickup")
      return formatDate(booking.pickupSchedule);
    return formatDate(booking.createdAt || booking.date);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        <button
          onClick={() => navigate("/customer.dashboard/booking-history")}
          className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
        >
          View All
        </button>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No bookings found</p>
          <button
            onClick={() => navigate("/customer.dashboard/book-parcel")}
            className="mt-2 text-green-600 hover:text-green-700 font-medium text-sm"
          >
            Book your first parcel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div
              key={booking.trackingId || booking._id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {booking.trackingId || booking._id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      To: {booking.receiverInfo?.name || booking.recipient}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Delivery Address:</p>
                  <p className="text-gray-900 font-medium">
                    {booking.receiverInfo?.address1 || booking.address}
                    {booking.receiverInfo?.city &&
                      `, ${booking.receiverInfo.city}`}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">{getDateLabel(booking)}</p>
                  <p className="text-gray-900 font-medium">
                    {getDateValue(booking)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentBookings;
