import { Search, AlertCircle } from "lucide-react";

function TrackingForm({
  trackingNumber,
  setTrackingNumber,
  onSubmit,
  isLoading,
  error,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
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
              placeholder="Enter tracking number (e.g., trkId001)"
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
          <p>
            Try sample tracking numbers:{" "}
            <span className="font-medium text-green-600">trkId001</span> or{" "}
            <span className="font-medium text-green-600">trkId002</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default TrackingForm;
