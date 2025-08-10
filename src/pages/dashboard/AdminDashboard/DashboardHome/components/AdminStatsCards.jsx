import {
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  UserCheck,
  Shield,
} from "lucide-react";
import Loading from "../../../../../components/ui/Loading";

function AdminStatsCards({ parcelsData, usersData, loading }) {
  if (loading) {
    return <Loading />;
  }

  const stats = [
    {
      title: "Total Bookings",
      value: parcelsData?.parcels?.length || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: usersData?.totalUsers?.total || 0,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Total Customers",
      value: usersData?.totalCustomers?.total || 0,
      icon: UserCheck,
      color: "bg-orange-500",
    },
    {
      title: "Total Agents",
      value: usersData?.totalAgents?.total || 0,
      icon: Shield,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
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

export default AdminStatsCards;
