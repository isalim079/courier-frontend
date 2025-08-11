import { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Navigation,
  RefreshCw,
  Route,
} from "lucide-react";
import { toast } from "react-hot-toast";

function LiveTrackingMap({ trackingData }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("overview"); // "overview", "agent", "destination", "directions"

  // Extract locations
  const agentLocation = trackingData.agentLocation;
  const receiverLocation = trackingData.receiverInfo.location;
  const agentName = trackingData.assignedAgent?.name || "Delivery Agent";
  const receiverName = trackingData.receiverInfo.name;

  // Generate Google Maps embed URL with different view modes
  const getGoogleMapsEmbedUrl = () => {
    const agentMarker = `color:blue|label:A|${agentLocation.lat},${agentLocation.lng}`;
    const receiverMarker = `color:red|label:R|${receiverLocation.lat},${receiverLocation.lng}`;

    switch (viewMode) {
      case "agent": {
        // Zoom to agent location
        return `https://maps.google.com/maps?q=${agentLocation.lat},${agentLocation.lng}&markers=${agentMarker}&zoom=16&output=embed`;
      }

      case "destination": {
        // Zoom to destination location
        return `https://maps.google.com/maps?q=${receiverLocation.lat},${receiverLocation.lng}&markers=${receiverMarker}&zoom=16&output=embed`;
      }

      case "directions": {
        // Show route between agent and destination
        const origin = `${agentLocation.lat},${agentLocation.lng}`;
        const destination = `${receiverLocation.lat},${receiverLocation.lng}`;
        return `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&markers=${agentMarker}&markers=${receiverMarker}&output=embed`;
      }

      default: {
        // Overview mode - show both locations
        const centerLat = (agentLocation.lat + receiverLocation.lat) / 2;
        const centerLng = (agentLocation.lng + receiverLocation.lng) / 2;
        return `https://maps.google.com/maps?q=${receiverLocation.lat},${receiverLocation.lng}&markers=${agentMarker}&markers=${receiverMarker}&center=${centerLat},${centerLng}&zoom=12&output=embed`;
      }
    }
  };

  // View mode handlers
  const showAgentLocation = () => {
    setViewMode("agent");
    // toast.success("Zooming to agent location");
  };

  const showDestination = () => {
    setViewMode("destination");
    // toast.success("Zooming to destination");
  };

  const showDirections = () => {
    setViewMode("directions");
    // toast.success("Showing route directions");
  };

  const showOverview = () => {
    setViewMode("overview");
    // toast.success("Showing overview");
  };

  // Generate Google Maps direction URL for external opening
  const getGoogleMapsDirectionUrl = () => {
    const origin = `${agentLocation.lat},${agentLocation.lng}`;
    const destination = `${receiverLocation.lat},${receiverLocation.lng}`;
    return `https://www.google.com/maps/dir/${origin}/${destination}`;
  };

  // Open in Google Maps
  const openInGoogleMaps = () => {
    window.open(getGoogleMapsDirectionUrl(), "_blank");
    toast.success("Opening in Google Maps");
  };

  // Calculate distance between two points (approximate)
  const calculateDistance = () => {
    const R = 6371; // Earth's radius in km
    const dLat = ((receiverLocation.lat - agentLocation.lat) * Math.PI) / 180;
    const dLon = ((receiverLocation.lng - agentLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((agentLocation.lat * Math.PI) / 180) *
        Math.cos((receiverLocation.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  // Refresh tracking data (you can implement actual refresh logic)
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Location updated");
    }, 1500);
  };

  // Get last updated time
  const getLastUpdated = () => {
    const lastUpdate = new Date(trackingData.updatedAt);
    return lastUpdate.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              Live Tracking
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Agent location and delivery destination
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center text-black space-x-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="text-sm">Refresh</span>
            </button>
            <button
              onClick={openInGoogleMaps}
              className="flex items-center space-x-1 text-black bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">Open in Maps</span>
            </button>
          </div>
        </div>

        {/* View Control Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={showOverview}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === "overview"
                ? "bg-white text-blue-600 border border-blue-200"
                : "bg-white bg-opacity-20 hover:bg-opacity-30 text-black"
            }`}
          >
            <Navigation className="h-4 w-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={showAgentLocation}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === "agent"
                ? "bg-white text-blue-600 border border-blue-200"
                : "bg-white text-black bg-opacity-20 hover:bg-opacity-30"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Agent Location</span>
          </button>
          <button
            onClick={showDestination}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === "destination"
                ? "bg-white text-blue-600 border border-blue-200"
                : "bg-white bg-opacity-20 hover:bg-opacity-30 text-black"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Destination</span>
          </button>
          <button
            onClick={showDirections}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === "directions"
                ? "bg-white text-blue-600 border border-blue-200"
                : "bg-white bg-opacity-20 hover:bg-opacity-30 text-black"
            }`}
          >
            <Route className="h-4 w-4" />
            <span>Show Directions</span>
          </button>
        </div>
      </div>

      {/* Location Info */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Agent Location</p>
              <p className="font-medium text-gray-900">{agentName}</p>
              <p className="text-xs text-gray-500">
                {agentLocation.lat.toFixed(6)}, {agentLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Destination</p>
              <p className="font-medium text-gray-900">{receiverName}</p>
              <p className="text-xs text-gray-500">
                {trackingData.receiverInfo.address1},{" "}
                {trackingData.receiverInfo.city}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Navigation className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approximate Distance</p>
              <p className="font-medium text-gray-900">
                {calculateDistance()} km
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {getLastUpdated()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 relative">
        <iframe
          src={getGoogleMapsEmbedUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Live Tracking Map"
          className="w-full h-full"
        />

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Map Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700">
                Agent (A) - {agentName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-700">
                Destination (R) - {receiverName}
              </span>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          🔴 Live Tracking Active
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>📍 Real-time agent location</span>
            <span>🎯 Delivery destination marked</span>
            <span>🔄 Updates automatically</span>
          </div>
          <span className="text-xs">
            Tracking ID: {trackingData.trackingId}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LiveTrackingMap;
