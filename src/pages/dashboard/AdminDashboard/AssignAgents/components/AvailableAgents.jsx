import {
  UserPlus,
  User,
  Star,
  MapPin,
  Activity,
  Package,
  Clock,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

function AvailableAgents({
  agents,
  allBookings,
  selectedBooking,
  onAssignAgent,
  assignLoading,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "available":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "busy":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "unavailable":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Determine agent status based on bookings
  const getAgentStatus = (agent) => {
    const assignedBookings = allBookings.filter(
      (booking) =>
        booking.assignedAgent && booking.assignedAgent._id === agent.id
    );

    if (assignedBookings.length === 0) {
      return "available";
    }

    // Check if agent has any non-delivered bookings
    const hasActiveBookings = assignedBookings.some(
      (booking) =>
        booking.status !== "Delivered" && booking.status !== "delivered"
    );

    return hasActiveBookings ? "busy" : "available";
  };

  // Filter agents based on search and status
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const agentStatus = getAgentStatus(agent);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && agentStatus === "available") ||
      (filterStatus === "unavailable" && agentStatus === "busy");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>All Agents ({agents.length})</span>
          </h2>
          {selectedBooking && (
            <span className="text-sm text-orange-600 font-medium">
              Select agent for {selectedBooking.trackingId}
            </span>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-8">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "No agents found matching your criteria"
                : "No available agents found"}
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredAgents.map((agent) => {
              const agentStatus = getAgentStatus(agent);
              return (
                <div
                  key={agent.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-gray-600">{agent.email}</p>
                        <p className="text-xs text-gray-500">ID: {agent.id}</p>
                      </div>
                    </div>
                    <span className={getStatusBadge(agentStatus)}>
                      {agentStatus === "busy" ? "Unavailable" : "Available"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-3 w-3" />
                      <span>Role: {agent.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {agent.role}
                      </span>
                      {agentStatus === "busy" && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Busy
                        </span>
                      )}
                    </div>

                    {selectedBooking && agentStatus === "available" && (
                      <button
                        onClick={() => onAssignAgent(agent.id)}
                        disabled={assignLoading}
                        className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-sm transition-colors cursor-pointer"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>{assignLoading ? "Assigning..." : "Assign"}</span>
                      </button>
                    )}

                    {selectedBooking && agentStatus === "busy" && (
                      <span className="text-sm text-gray-500 italic">
                        Currently busy
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableAgents;
