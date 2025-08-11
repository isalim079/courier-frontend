import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import TrackParcelHeader from "./TrackParcelHeader";
import TrackingForm from "./TrackingForm";
import TrackingStatusCard from "./TrackingStatusCard";
import TrackingTimeline from "./TrackingTimeline";
import PackageDetails from "./PackageDetails";
import ContactInformation from "./ContactInformation";
import LiveTrackingMap from "./LiveTrackingMap";

function TrackParcel() {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useAxiosPublic();

  // Get tracking ID from URL params on component mount
  useEffect(() => {
    const trackingId = searchParams.get("id");
    if (trackingId) {
      setTrackingNumber(trackingId);
      // Auto-track if tracking ID is in URL
      handleTrackPackage(null, trackingId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTrackPackage = async (e, directTrackingId = null) => {
    if (e) e.preventDefault();
    
    const trackingId = directTrackingId || trackingNumber.trim();
    
    if (!trackingId) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.get(`/parcel/track/${trackingId}`);
      
      if (response.data.success) {
        setTrackingData(response.data.data.parcel);
        setError("");
        toast.success("Tracking data retrieved successfully");
      } else {
        setTrackingData(null);
        setError("Failed to retrieve tracking data");
      }
    } catch (error) {
      console.error("Tracking error:", error);
      setTrackingData(null);
      
      if (error.response?.status === 404) {
        setError("Tracking number not found. Please check and try again.");
      } else {
        setError("Failed to track parcel. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
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

            {/* Live Tracking Map - Show only if agent location and receiver location exist */}
            {trackingData.agentLocation && 
             trackingData.receiverInfo?.location?.lat && 
             trackingData.receiverInfo?.location?.lng && (
              <LiveTrackingMap trackingData={trackingData} />
            )}

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
