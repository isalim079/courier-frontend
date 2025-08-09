import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  MapPin,
  DollarSign,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 10;

  // Mock data - replace with actual API call
  const allBookings = [
    {
      id: "PKG001",
      recipient: "John Smith",
      recipientPhone: "+1 987-654-3210",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      status: "In Transit",
      date: "2025-08-09",
      estimatedDelivery: "2025-08-10",
      packageType: "Electronics",
      weight: "2.5 kg",
      serviceType: "Express Delivery",
      amount: 25.00,
      trackingUrl: "/customer.dashboard/track-parcel",
    },
    {
      id: "PKG002",
      recipient: "Sarah Johnson",
      recipientPhone: "+1 555-123-4567",
      address: "789 Pine St, Queens, NY 11101",
      status: "Delivered",
      date: "2025-08-08",
      deliveredAt: "2025-08-08 02:30 PM",
      packageType: "Documents",
      weight: "0.5 kg",
      serviceType: "Standard Delivery",
      amount: 15.00,
      trackingUrl: "/customer.dashboard/track-parcel",
    },
    {
      id: "PKG003",
      recipient: "Mike Wilson",
      recipientPhone: "+1 444-555-6666",
      address: "321 Elm St, Manhattan, NY 10001",
      status: "Pending Pickup",
      date: "2025-08-09",
      scheduledPickup: "2025-08-10 09:00 AM",
      packageType: "Clothing",
      weight: "1.2 kg",
      serviceType: "Standard Delivery",
      amount: 15.00,
      trackingUrl: "/customer.dashboard/track-parcel",
    },
    {
      id: "PKG004",
      recipient: "Emily Davis",
      recipientPhone: "+1 777-888-9999",
      address: "654 Cedar Ave, Staten Island, NY 10301",
      status: "Delivered",
      date: "2025-08-06",
      deliveredAt: "2025-08-07 11:15 AM",
      packageType: "Books",
      weight: "3.0 kg",
      serviceType: "Express Delivery",
      amount: 28.00,
      trackingUrl: "/customer.dashboard/track-parcel",
    },
    {
      id: "PKG005",
      recipient: "David Brown",
      recipientPhone: "+1 111-222-3333",
      address: "987 Maple St, Bronx, NY 10451",
      status: "Cancelled",
      date: "2025-08-05",
      cancelledAt: "2025-08-05 03:45 PM",
      packageType: "Electronics",
      weight: "1.8 kg",
      serviceType: "Overnight Delivery",
      amount: 45.00,
      refunded: true,
    },
    {
      id: "PKG006",
      recipient: "Lisa Anderson",
      recipientPhone: "+1 666-777-8888",
      address: "159 Birch Rd, Brooklyn, NY 11205",
      status: "Delivered",
      date: "2025-08-04",
      deliveredAt: "2025-08-05 09:30 AM",
      packageType: "Food Items",
      weight: "2.2 kg",
      serviceType: "Express Delivery",
      amount: 30.00,
      trackingUrl: "/customer.dashboard/track-parcel",
    },
    // Add more mock data for pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `PKG${String(i + 7).padStart(3, '0')}`,
      recipient: `Customer ${i + 7}`,
      recipientPhone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      address: `${Math.floor(Math.random() * 999 + 1)} Sample St, New York, NY ${Math.floor(Math.random() * 90000 + 10000)}`,
      status: ["Delivered", "In Transit", "Pending Pickup"][Math.floor(Math.random() * 3)],
      date: `2025-08-${String(Math.floor(Math.random() * 8) + 1).padStart(2, '0')}`,
      packageType: ["Electronics", "Documents", "Clothing", "Books"][Math.floor(Math.random() * 4)],
      weight: `${(Math.random() * 4 + 0.5).toFixed(1)} kg`,
      serviceType: ["Standard Delivery", "Express Delivery", "Overnight Delivery"][Math.floor(Math.random() * 3)],
      amount: Math.floor(Math.random() * 40) + 15,
      trackingUrl: "/customer.dashboard/track-parcel",
    })),
  ];

  // Filter bookings based on search and filters
  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase().replace(" ", "-") === statusFilter;
    
    const matchesDate = (() => {
      if (dateFilter === "all") return true;
      const bookingDate = new Date(booking.date);
      const today = new Date();
      
      switch (dateFilter) {
        case "today":
          return bookingDate.toDateString() === today.toDateString();
        case "week": {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return bookingDate >= weekAgo;
        }
        case "month": {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return bookingDate >= monthAgo;
        }
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleTrackParcel = (trackingId) => {
    navigate(`/customer.dashboard/track-parcel?id=${trackingId}`);
  };

  const handleExportData = () => {
    // Simulate CSV export
    const csvContent = [
      ["Tracking ID", "Recipient", "Address", "Status", "Date", "Amount"].join(","),
      ...filteredBookings.map(booking => [
        booking.id,
        booking.recipient,
        booking.address.replace(/,/g, ";"),
        booking.status,
        booking.date,
        `$${booking.amount}`
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking-history.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/customer.dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Booking History</h1>
                <p className="text-gray-600 mt-1">
                  View and manage all your parcel bookings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: allBookings.length, color: "bg-blue-100 text-blue-800" },
            { label: "Delivered", value: allBookings.filter(b => b.status === "Delivered").length, color: "bg-green-100 text-green-800" },
            { label: "In Transit", value: allBookings.filter(b => b.status === "In Transit").length, color: "bg-yellow-100 text-yellow-800" },
            { label: "Total Spent", value: `$${allBookings.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}`, color: "bg-purple-100 text-purple-800" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tracking ID, recipient, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="in-transit">In Transit</option>
                <option value="pending-pickup">Pending Pickup</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {paginatedBookings.length} of {filteredBookings.length} bookings
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {paginatedBookings.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't made any bookings yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                          <div className="text-sm text-gray-500">{booking.packageType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.recipient}</div>
                          <div className="text-sm text-gray-500">{booking.recipientPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{booking.address}</div>
                          <div className="text-sm text-gray-500">{booking.weight}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.date}</div>
                          <div className="text-sm text-gray-500">{booking.serviceType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${booking.amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.status !== "Cancelled" && (
                            <button
                              onClick={() => handleTrackParcel(booking.id)}
                              className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              <Eye className="h-4 w-4" />
                              <span>Track</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                <div className="space-y-4 p-4">
                  {paginatedBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{booking.id}</h3>
                            <p className="text-sm text-gray-500">{booking.packageType}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">To: {booking.recipient}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">${booking.amount.toFixed(2)}</span>
                        </div>
                      </div>

                      {booking.status !== "Cancelled" && (
                        <div className="mt-4">
                          <button
                            onClick={() => handleTrackParcel(booking.id)}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Track Package</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? "bg-green-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-400">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-green-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
