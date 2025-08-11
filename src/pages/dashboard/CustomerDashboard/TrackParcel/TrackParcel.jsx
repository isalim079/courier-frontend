import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TrackParcelHeader from "./TrackParcelHeader";
import TrackingForm from "./TrackingForm";
import TrackingStatusCard from "./TrackingStatusCard";
import TrackingTimeline from "./TrackingTimeline";
import PackageDetails from "./PackageDetails";
import ContactInformation from "./ContactInformation";

function TrackParcel() {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get tracking ID from URL params on component mount
  useEffect(() => {
    const trackingId = searchParams.get('id');
    if (trackingId) {
      setTrackingNumber(trackingId);
    }
  }, [searchParams]);

  // Mock tracking data - replace with actual API call
  const mockTrackingData = {
    trkId001: {
      id: "trkId001",
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
    trkId002: {
      id: "trkId002",
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
      const data = mockTrackingData[trackingNumber];
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

  return (
    <div className="min-h-screen bg-gray-50">
      <TrackParcelHeader />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <TrackingForm
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          onSubmit={handleTrackPackage}
          isLoading={isLoading}
          error={error}
        />

        {trackingData && (
          <div className="space-y-6">
            <TrackingStatusCard trackingData={trackingData} />
            
            <TrackingTimeline trackingData={trackingData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PackageDetails trackingData={trackingData} />
              <ContactInformation trackingData={trackingData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackParcel;
