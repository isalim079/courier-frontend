import { Package, CheckCircle, Clock, AlertCircle } from "lucide-react";

function DeliveryStats({ statistics }) {
  const stats = [
    {
      title: "Total Deliveries",
      value: statistics?.completed || 0,
      icon: Package,
      color: "text-blue-500"
    },
    {
      title: "Successful",
      value: statistics?.completed || 0,
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "In Progress",
      value: statistics?.inProgress || 0,
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      title: "Failed",
      value: statistics?.failed || 0,
      icon: AlertCircle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <IconComponent className={`h-8 w-8 ${stat.color}`} />
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryStats;
