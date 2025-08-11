import { MapPin, Wifi, WifiOff, AlertCircle } from 'lucide-react';

function LocationStatusIndicator({ 
  isConnected, 
  locationPermission, 
  currentLocation, 
  onRequestPermission 
}) {
  const getStatusColor = () => {
    if (locationPermission === 'granted' && isConnected && currentLocation) {
      return 'bg-green-500';
    } else if (locationPermission === 'granted' && currentLocation) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  const getStatusText = () => {
    if (locationPermission === 'denied') {
      return 'Location Disabled';
    } else if (locationPermission === 'granted' && isConnected && currentLocation) {
      return 'Tracking Active';
    } else if (locationPermission === 'granted' && currentLocation) {
      return 'Location Ready';
    } else {
      return 'Location Required';
    }
  };

  const getIcon = () => {
    if (locationPermission === 'denied') {
      return <AlertCircle className="h-4 w-4" />;
    } else if (isConnected) {
      return <Wifi className="h-4 w-4" />;
    } else if (currentLocation) {
      return <MapPin className="h-4 w-4" />;
    } else {
      return <WifiOff className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor()} text-white`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {getStatusText()}
            </h3>
            <p className="text-xs text-gray-600">
              {currentLocation 
                ? `Lat: ${currentLocation.lat.toFixed(6)}, Lng: ${currentLocation.lng.toFixed(6)}`
                : 'No location data'
              }
            </p>
          </div>
        </div>

        {locationPermission !== 'granted' && (
          <button
            onClick={onRequestPermission}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enable
          </button>
        )}
      </div>

      {isConnected && (
        <div className="mt-2 flex items-center text-xs text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Connected to tracking service
        </div>
      )}
    </div>
  );
}

export default LocationStatusIndicator;
