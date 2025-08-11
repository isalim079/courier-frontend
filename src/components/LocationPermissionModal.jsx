import { MapPin, AlertCircle, Check } from 'lucide-react';

function LocationPermissionModal({ 
  isOpen, 
  onRequestPermission, 
  onSkip, 
  locationPermission 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Enable Location Services
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            To provide real-time delivery tracking and optimize your routes, 
            we need access to your location. This helps customers track their 
            parcels and improves delivery efficiency.
          </p>

          {locationPermission === 'denied' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-red-800">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  Location access denied. Please enable it in your browser settings.
                </span>
              </div>
            </div>
          )}

          {locationPermission === 'granted' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-green-800">
                <Check className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  Location access granted successfully!
                </span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Benefits:</h4>
            <ul className="text-xs text-blue-800 space-y-1 text-left">
              <li>• Real-time parcel tracking for customers</li>
              <li>• Optimized delivery routes</li>
              <li>• Better delivery time estimates</li>
              <li>• Improved customer satisfaction</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRequestPermission}
              disabled={locationPermission === 'granted'}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              {locationPermission === 'granted' ? 'Enabled' : 'Enable Location'}
            </button>
            
            <button
              onClick={onSkip}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Skip for Now
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            You can change this setting anytime in your browser preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationPermissionModal;
