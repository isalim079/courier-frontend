import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
  Plus,
  Eye,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerDashboardHome() {
  const navigate = useNavigate();

  // Mock data - replace with actual data from backend
  const stats = {
    totalBookings: 24,
    activeDeliveries: 3,
    completedDeliveries: 21,
    pendingPickups: 1,
  };

  const recentBookings = [
    {
      id: "PKG001",
      recipient: "John Smith",
      address: "123 Main St, New York",
      status: "In Transit",
      date: "2025-08-09",
      estimatedDelivery: "2025-08-10",
    },
    {
      id: "PKG002",
      recipient: "Sarah Johnson",
      address: "456 Oak Ave, Brooklyn",
      status: "Delivered",
      date: "2025-08-08",
      deliveredAt: "2025-08-08 14:30",
    },
    {
      id: "PKG003",
      recipient: "Mike Wilson",
      address: "789 Pine St, Queens",
      status: "Pending Pickup",
      date: "2025-08-09",
      scheduledPickup: "2025-08-10 09:00",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const quickActions = [
    {
      title: "Book New Parcel",
      description: "Send a new package",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600",
      path: "/customer.dashboard/book-parcel",
    },
    {
      title: "Track Parcel",
      description: "Real-time tracking",
      icon: Eye,
      color: "bg-blue-500 hover:bg-blue-600",
      path: "/customer.dashboard/track-parcel",
    },
    {
      title: "View History",
      description: "All past bookings",
      icon: History,
      color: "bg-purple-500 hover:bg-purple-600",
      path: "/customer.dashboard/booking-history",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Customer Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Manage your parcels and track deliveries.
              </p>
            </div>
            <button
              onClick={() => navigate("/customer.dashboard/book-parcel")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Book Parcel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Deliveries
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeDeliveries}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Currently in transit
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Deliveries
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.completedDeliveries}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Successfully delivered</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Pickups
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.pendingPickups}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">Awaiting pickup</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color} transition-colors`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Bookings
            </h2>
            <button
              onClick={() => navigate("/customer.dashboard/booking-history")}
              className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {booking.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        To: {booking.recipient}
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
                    <p className="text-gray-900 font-medium">{booking.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      {booking.status === "Delivered" && "Delivered At:"}
                      {booking.status === "In Transit" && "Estimated Delivery:"}
                      {booking.status === "Pending Pickup" && "Scheduled Pickup:"}
                    </p>
                    <p className="text-gray-900 font-medium">
                      {booking.deliveredAt || booking.estimatedDelivery || booking.scheduledPickup}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboardHome;
