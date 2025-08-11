import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TrackParcelHeader() {
  const navigate = useNavigate();

  return (
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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-6 w-6" />
              Track Parcel
            </h1>
            <p className="text-gray-600 mt-1">
              Enter your tracking number to see real-time updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackParcelHeader;
