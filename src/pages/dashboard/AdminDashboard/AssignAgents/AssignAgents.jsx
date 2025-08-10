import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import Loading from "../../../../components/ui/Loading";

// Components
import AssignAgentsHeader from "./components/AssignAgentsHeader";
import UnassignedBookings from "./components/UnassignedBookings";
import AvailableAgents from "./components/AvailableAgents";
import AssignInstructions from "./components/AssignInstructions";

const AssignAgents = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [allAgents, setAllAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const api = useAxiosPublic();

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch bookings and agents in parallel
      const [bookingsResponse, agentsResponse] = await Promise.all([
        api.get("/parcel/all-bookings"),
        api.get("/auth/all-users"),
      ]);

      setAllBookings(bookingsResponse.data?.data?.parcels || []);
      setAllAgents(agentsResponse.data?.data?.totalAgents?.users || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(allBookings, "=> all bookings");
  // Filter unassigned bookings (assignedAgent is null or undefined)
  const unassignedBookings = allBookings.filter((booking) => {
    const hasNoAgent = !booking.assignedAgent || booking.assignedAgent === null;

    console.log(
      `Booking ${booking.id}: assignedAgent = ${JSON.stringify(
        booking.assignedAgent
      )}, hasNoAgent = ${hasNoAgent}`
    );
    return hasNoAgent;
  });

  // Filter available agents (agents who are not currently assigned to any booking)
  const assignedAgentIds = allBookings
    .filter((booking) => booking.assignedAgent && booking.assignedAgent._id)
    .map((booking) => booking.assignedAgent._id);

  const availableAgents = allAgents.filter((agent) => {
    const isNotAssigned = !assignedAgentIds.includes(agent.id);
    console.log(
      `Agent ${agent.id} (${agent.name}): isNotAssigned = ${isNotAssigned}`
    );
    return isNotAssigned;
  });

  console.log("Unassigned bookings count:", unassignedBookings.length);
  console.log("Available agents count:", availableAgents.length);

  // Handle agent assignment
  const handleAssignAgent = async (agentId) => {
    if (!selectedBooking) {
      toast.error("Please select a booking first");
      return;
    }

    try {
      setAssignmentLoading(true);

      await api.put(`/parcel/assign-agent/${selectedBooking.id}`, {
        agentId: agentId,
      });

      toast.success("Agent assigned successfully!");
      setSelectedBooking(null);

      // Refresh data
      await fetchData();
    } catch (error) {
      console.error("Error assigning agent:", error);
      toast.error("Failed to assign agent");
    } finally {
      setAssignmentLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6">
      <AssignAgentsHeader
        unassignedCount={unassignedBookings.length}
        availableAgentsCount={availableAgents.length}
      />

      <AssignInstructions selectedBooking={selectedBooking} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UnassignedBookings
          bookings={unassignedBookings}
          selectedBooking={selectedBooking}
          onSelectBooking={setSelectedBooking}
        />

        <AvailableAgents
          agents={availableAgents}
          selectedBooking={selectedBooking}
          onAssignAgent={handleAssignAgent}
          assignLoading={assignmentLoading}
        />
      </div>
    </div>
  );
};

export default AssignAgents;
