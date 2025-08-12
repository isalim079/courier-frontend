import { Users } from "lucide-react";

function AgentsPerformance({ agents, bookings, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span>Agent Performance</span>
          </h3>
        </div>
        <div className="p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate agent performance based on assigned bookings
  const agentPerformance =
    agents
      ?.map((agent) => {
        const assignedBookings =
          bookings?.filter(
            (booking) =>
              booking.assignedAgent && booking.assignedAgent._id === agent.id
          ) || [];

        const completedBookings = assignedBookings.filter(
          (booking) => booking.status === "Delivered"
        );

        return {
          ...agent,
          assignedCount: assignedBookings.length,
          completedCount: completedBookings.length,
          completionRate:
            assignedBookings.length > 0
              ? (completedBookings.length / assignedBookings.length) * 100
              : 0,
        };
      })
      .filter((agent) => agent.assignedCount > 0) || [];

  // Sort by completion rate
  const topAgents = agentPerformance
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Users className="h-5 w-5 text-orange-600" />
          <span>Top Performing Agents</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {topAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">
                    {agent.completedCount}/{agent.assignedCount} deliveries
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {agent.completionRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          ))}
        </div>
        {topAgents.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No agent performance data available
          </p>
        )}
      </div>
    </div>
  );
}

export default AgentsPerformance;
