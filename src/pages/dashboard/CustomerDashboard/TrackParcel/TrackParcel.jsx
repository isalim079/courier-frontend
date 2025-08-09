import { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  ArrowLeft,
  AlertCircle,
  Phone,
  Mail,
  User,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function TrackParcel() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock tracking data - replace with actual API call
  const mockTrackingData = {
    PKG001: {
      id: "PKG001",
      status: "In Transit",
      estimatedDelivery: "2025-08-10",
      currentLocation: "Distribution Center - Brooklyn",
      sender: {
        name: "Customer User",
        phone: "+1 234-567-8900",
        email: "customer@cpms.com",
        address: "123 Main St, New York, NY 10001",
      },
      recipient: {
        name: "John Smith",
        phone: "+1 987-654-3210",
        email: "john.smith@email.com",
        address: "456 Oak Ave, Brooklyn, NY 11201",
      },
      package: {
        type: "Electronics",
        weight: "2.5 kg",
        dimensions: "30x20x15 cm",
        description: "Smartphone",
      },
      service: {
        type: "Express Delivery",
        deliveryTime: "1-2 days",
      },
      timeline: [
        {
          status: "Package Picked Up",
          location: "New York, NY",
          timestamp: "2025-08-09 09:30 AM",
          description: "Package collected from sender",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Distribution Center - Brooklyn",
          timestamp: "2025-08-09 02:15 PM",
          description: "Package arrived at distribution center",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Brooklyn, NY",
          timestamp: "Expected: 2025-08-10 08:00 AM",
          description: "Package will be loaded for delivery",
          completed: false,
        },
        {
          status: "Delivered",
          location: "456 Oak Ave, Brooklyn",
          timestamp: "Expected: 2025-08-10 05:00 PM",
          description: "Package will be delivered to recipient",
          completed: false,
        },
      ],
    },
    PKG002: {
      id: "PKG002",
      status: "Delivered",
      deliveredAt: "2025-08-08 02:30 PM",
      currentLocation: "Delivered to recipient",
      sender: {
        name: "Customer User",
        phone: "+1 234-567-8900",
        email: "customer@cpms.com",
        address: "123 Main St, New York, NY 10001",
      },
      recipient: {
        name: "Sarah Johnson",
        phone: "+1 555-123-4567",
        email: "sarah.j@email.com",
        address: "789 Pine St, Queens, NY 11101",
      },
      package: {
        type: "Documents",
        weight: "0.5 kg",
        dimensions: "25x18x2 cm",
        description: "Legal documents",
      },
      service: {
        type: "Standard Delivery",
        deliveryTime: "3-5 days",
      },
      timeline: [
        {
          status: "Package Picked Up",
          location: "New York, NY",
          timestamp: "2025-08-07 10:00 AM",
          description: "Package collected from sender",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Distribution Center - Queens",
          timestamp: "2025-08-07 04:20 PM",
          description: "Package arrived at distribution center",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Queens, NY",
          timestamp: "2025-08-08 08:30 AM",
          description: "Package loaded for delivery",
          completed: true,
        },
        {
          status: "Delivered",
          location: "789 Pine St, Queens",
          timestamp: "2025-08-08 02:30 PM",
          description: "Package delivered successfully to recipient",
          completed: true,
        },
      ],
    },
  };

  const handleTrackPackage = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber.toUpperCase()];
      if (data) {
        setTrackingData(data);
        setError("");
      } else {
        setTrackingData(null);
        setError("Tracking number not found. Please check and try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    switch (status) {
      case "Package Picked Up":
        return <Package className="h-5 w-5 text-blue-600" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "Out for Delivery":
        return <MapPin className="h-5 w-5 text-orange-600" />;
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Pending Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/customer.dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Parcel</h1>
              <p className="text-gray-600 mt-1">
                Enter your tracking number to see real-time updates
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleTrackPackage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter tracking number (e.g., PKG001)"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Tracking...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Track</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              <p>Try sample tracking numbers: <span className="font-medium text-green-600">PKG001</span> or <span className="font-medium text-green-600">PKG002</span></p>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {trackingData.id}
                    </h2>
                    <p className="text-gray-600">
                      {trackingData.package.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    trackingData.status
                  )}`}
                >
                  {trackingData.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Current Location:</p>
                  <p className="font-medium text-gray-900">
                    {trackingData.currentLocation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    {trackingData.status === "Delivered"
                      ? "Delivered At:"
                      : "Estimated Delivery:"}
                  </p>
                  <p className="font-medium text-gray-900">
                    {trackingData.deliveredAt || trackingData.estimatedDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Service Type:</p>
                  <p className="font-medium text-gray-900">
                    {trackingData.service.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Tracking Timeline
              </h3>
              <div className="space-y-4">
                {trackingData.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(event.status, event.completed)}
                    </div>
                    <div
                      className={`flex-1 ${
                        index < trackingData.timeline.length - 1
                          ? "border-l-2 border-gray-200 ml-2 pl-4 pb-4"
                          : "ml-2 pl-4"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`font-medium ${
                            event.completed
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {event.status}
                        </h4>
                        <span
                          className={`text-sm ${
                            event.completed
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {event.timestamp}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          event.completed ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {event.description}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          event.completed ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package & Contact Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Package Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 text-green-600 mr-2" />
                  Package Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">
                      {trackingData.package.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">
                      {trackingData.package.weight}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium text-gray-900">
                      {trackingData.package.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium text-gray-900">
                      {trackingData.package.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 text-green-600 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {/* Sender */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Sender:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">
                        {trackingData.sender.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{trackingData.sender.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{trackingData.sender.email}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3 w-3 mt-0.5" />
                        <span>{trackingData.sender.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipient */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recipient:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">
                        {trackingData.recipient.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{trackingData.recipient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{trackingData.recipient.email}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3 w-3 mt-0.5" />
                        <span>{trackingData.recipient.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackParcel;
