import { Plus, Eye, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Book New Parcel",
      description: "Send a new package",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600",
      path: "/customer.dashboard/book-parcel",
    },
    {
      title: "Track Parcel",
      description: "Real-time tracking",
      icon: Eye,
      color: "bg-blue-500 hover:bg-blue-600",
      path: "/customer.dashboard/track-parcel",
    },
    {
      title: "View History",
      description: "All past bookings",
      icon: History,
      color: "bg-purple-500 hover:bg-purple-600",
      path: "/customer.dashboard/booking-history",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color} transition-colors`}
                >
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
