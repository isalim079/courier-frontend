import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  X,
  MapPin,
  Play,
  Square,
  Navigation,
  Compass,
  ExternalLink,
} from "lucide-react";

function NavigationMap({ parcel, onClose }) {
  const [agentLocation, setAgentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [heading, setHeading] = useState(null);
  const [showCompass, setShowCompass] = useState(false);
  const [zoomToAgent, setZoomToAgent] = useState(false);
  const watchIdRef = useRef(null);
  const mapRef = useRef(null);

  // Get agent's current location initially
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000, // 1 minute
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.heading || null,
          timestamp: Date.now(),
        };
        setAgentLocation(newLocation);
        setLocationHistory([newLocation]);
        setHeading(position.coords.heading);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to get your current location");
        setLoading(false);
        toast.error("Please enable location access to use navigation");
      },
      options
    );

    // Start compass/heading tracking if available
    if ("DeviceOrientationEvent" in window) {
      const handleOrientation = (event) => {
        // Alpha gives us the compass heading (0-360 degrees)
        if (event.alpha !== null) {
          setHeading(360 - event.alpha); // Convert to standard compass heading
        }
      };

      window.addEventListener("deviceorientation", handleOrientation);
      setShowCompass(true);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, []);

  // Start live tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, // Always get fresh location
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.heading || heading, // Use device heading if GPS heading not available
          timestamp: Date.now(),
          accuracy: position.coords.accuracy,
        };

        setAgentLocation(newLocation);
        setLocationHistory((prev) => [...prev, newLocation]);

        // Update map if needed (for future map integration)
        if (mapRef.current) {
          // This will be used when we integrate with a proper map library
          console.log("Updating map with new location:", newLocation);
        }
      },
      (error) => {
        console.error("Error tracking location:", error);
        toast.error("Unable to track location");
        setIsTracking(false);
      },
      options
    );

    watchIdRef.current = watchId;
    setIsTracking(true);
    toast.success("Started live tracking");
  };

  // Stop live tracking
  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    toast.success("Stopped live tracking");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Get current location with zoom to agent
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.heading || heading,
          timestamp: Date.now(),
        };
        setAgentLocation(newLocation);
        setZoomToAgent(true); // Trigger zoom to agent location
        toast.success("Location updated - Zooming to your position");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to get current location");
      },
      options
    );
  };

  // Generate Google Maps URL with zoom to agent location
  const getGoogleMapsUrl = () => {
    if (!agentLocation || !parcel.receiverInfo?.location) {
      return null;
    }

    const origin = `${agentLocation.lat},${agentLocation.lng}`;
    const destination = `${parcel.receiverInfo.location.lat},${parcel.receiverInfo.location.lng}`;

    // If zooming to agent, center on agent location with higher zoom
    if (zoomToAgent) {
      return `https://maps.google.com/maps?q=${origin}&ll=${origin}&z=18&output=embed`;
    }

    // Normal route view
    return `https://maps.google.com/maps?q=${destination}&saddr=${origin}&daddr=${destination}&output=embed`;
  };

  // Get compass direction text
  const getCompassDirection = (degrees) => {
    if (degrees === null || degrees === undefined) return "Unknown";

    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Reset zoom to show full route
  const showFullRoute = () => {
    setZoomToAgent(false);
    toast.success("Showing full route");
  };

  // Open in external Google Maps
  const openInGoogleMaps = () => {
    if (!agentLocation || !parcel.receiverInfo?.location) {
      toast.error("Location data not available");
      return;
    }

    const origin = `${agentLocation.lat},${agentLocation.lng}`;
    const destination = `${parcel.receiverInfo.location.lat},${parcel.receiverInfo.location.lng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;

    window.open(googleMapsUrl, "_blank");
    toast.success("Opening in Google Maps");
  };

  if (!parcel || !parcel.receiverInfo?.location) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Navigation Error
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            No destination coordinates available for this parcel.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Navigate to {parcel.receiverInfo.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-600">Destination:</p>
              <p className="font-medium text-gray-900 text-sm">
                {parcel.receiverInfo.address1}
                {parcel.receiverInfo.city && `, ${parcel.receiverInfo.city}`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Phone:</p>
              <p className="font-medium text-gray-900 text-sm">
                {parcel.receiverInfo.phone}
              </p>
            </div>

            {parcel.parcelDetails?.specialInstructions && (
              <div>
                <p className="text-sm text-gray-600">Special Instructions:</p>
                <p className="font-medium text-gray-900 text-sm">
                  {parcel.parcelDetails.specialInstructions}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-sm text-gray-700">
                  {isTracking ? "Live Tracking Active" : "Tracking Inactive"}
                </span>
              </div>

              {/* Compass Display */}
              {showCompass && heading !== null && (
                <div className="flex items-center space-x-2 bg-white rounded-md px-2 py-1 border">
                  <Compass
                    className="h-4 w-4 text-blue-600"
                    style={{ transform: `rotate(${heading}deg)` }}
                  />
                  <span className="text-xs text-gray-700">
                    {getCompassDirection(heading)} ({Math.round(heading)}°)
                  </span>
                </div>
              )}

              {agentLocation && (
                <div className="text-xs text-gray-500">
                  📍 {agentLocation.lat.toFixed(6)},{" "}
                  {agentLocation.lng.toFixed(6)}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={getCurrentLocation}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-sm"
                title="Zoom to My Location"
              >
                <MapPin className="h-4 w-4" />
                <span>My Location</span>
              </button>

              <button
                onClick={openInGoogleMaps}
                className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer text-sm"
                title="Open in Google Maps"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Google Maps</span>
              </button>

              {zoomToAgent && (
                <button
                  onClick={showFullRoute}
                  className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer text-sm"
                  title="Show Full Route"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Full Route</span>
                </button>
              )}

              {!isTracking ? (
                <button
                  onClick={startTracking}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer text-sm"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Tracking</span>
                </button>
              ) : (
                <button
                  onClick={stopTracking}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer text-sm"
                >
                  <Square className="h-4 w-4" />
                  <span>Stop Tracking</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Map Content */}
        <div className="flex-1 p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Getting your location...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={onClose}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && agentLocation && (
            <div className="h-full rounded-lg overflow-hidden border border-gray-300">
              <iframe
                src={getGoogleMapsUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Navigation to ${parcel.receiverInfo.name}`}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <p>
                  🚗{" "}
                  {zoomToAgent
                    ? "Zoomed to your location"
                    : "Follow the route shown on the map above"}
                </p>
                <p>📱 Call customer: {parcel.receiverInfo.phone}</p>
                {isTracking && (
                  <p className="text-green-600 font-medium">
                    🔴 Live tracking: {locationHistory.length} location updates
                  </p>
                )}
                {showCompass && heading !== null && (
                  <p className="text-blue-600 font-medium">
                    🧭 Heading: {getCompassDirection(heading)} (
                    {Math.round(heading)}°)
                  </p>
                )}
              </div>
              {agentLocation && (
                <div className="mt-2 text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(agentLocation.timestamp).toLocaleTimeString()}
                  {agentLocation.accuracy &&
                    ` | Accuracy: ±${Math.round(agentLocation.accuracy)}m`}
                  {zoomToAgent && " | 🔍 Zoomed to agent location"}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Close Navigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationMap;
