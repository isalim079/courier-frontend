import {
  TrendingUp,
  Package,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Loading from "../../../../../components/ui/Loading";

function StatsCards({ stats, total, loading }) {
  const statsConfig = [
    {
      title: "Total Bookings",
      icon: Package,
      value: total,
      color: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+12%",
      trendText: "from last month",
    },
    {
      title: "Active Deliveries",
      icon: MapPin,
      value: stats?.activeDeliveries,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      subtitle: "Currently in transit",
    },
    {
      title: "Completed Deliveries",
      icon: CheckCircle,
      value: stats?.completedDeliveries,
      color: "bg-green-100",
      iconColor: "text-green-600",
      subtitle: "Successfully delivered",
    },
    {
      title: "Pending Pickups",
      icon: Clock,
      value: stats?.pendingPickups,
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
      subtitle: "Awaiting pickup",
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((config, index) => {
        const IconComponent = config.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {config.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {config.value}
                </p>
              </div>
              <div
                className={`h-12 w-12 ${config.color} rounded-lg flex items-center justify-center`}
              >
                <IconComponent className={`h-6 w-6 ${config.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;
