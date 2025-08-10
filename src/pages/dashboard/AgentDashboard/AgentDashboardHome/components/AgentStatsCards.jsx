import { 
  Package, 
  CheckCircle,
  Clock, 
  AlertCircle 
} from 'lucide-react';

function AgentStatsCards({ statistics, loading }) {
  const statsConfig = [
    {
      title: 'Assigned Today',
      value: statistics?.assignedToday || 0,
      change: 'Today\'s assignments',
      changeType: 'neutral',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Completed',
      value: statistics?.completed || 0,
      change: 'Successfully delivered',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'In Progress',
      value: statistics?.inProgress || 0,
      change: 'Currently active',
      changeType: 'neutral',
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      title: 'Pending Pickup',
      value: statistics?.pendingPickups || 0,
      change: 'Awaiting pickup',
      changeType: 'warning',
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-200 w-12 h-12 rounded-lg"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statsConfig.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'warning' ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AgentStatsCards;
