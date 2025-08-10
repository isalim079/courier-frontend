import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Manage your parcels and track deliveries.
            </p>
          </div>
          <button
            onClick={() => navigate("/customer.dashboard/book-parcel")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Book Parcel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
