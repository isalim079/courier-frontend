import { DollarSign, Package, Users, Clock } from "lucide-react";

function ReportsStatsCards({ reportsData, loading }) {
  if (loading || !reportsData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `$${reportsData.totalRevenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Total Bookings",
      value: reportsData.totalBookings?.toLocaleString() || "0",
 
      icon: Package,
      color: "blue",
    },
    {
      title: "Active Users",
      value: reportsData.totalUsers?.toLocaleString() || "0",

      icon: Users,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-${stat.color}-500 p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
          
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReportsStatsCards;
