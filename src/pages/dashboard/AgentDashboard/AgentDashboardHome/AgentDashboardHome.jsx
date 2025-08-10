import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import Loading from "../../../../components/ui/Loading";

// Components
import AgentDashboardHeader from "./components/AgentDashboardHeader";
import AgentStatsCards from "./components/AgentStatsCards";
import AssignedParcels from "./components/AssignedParcels";
import NavigationMap from "./components/NavigationMap";
import UpdateStatusModal from "./components/UpdateStatusModal";

function AgentDashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const api = useAxiosPublic();

  // Fetch agent dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/parcel/agent-dashboard");

      if (response.data.success === true) {
        setData(response.data.data);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handle navigation to parcel location
  const handleNavigate = (parcel) => {
    if (
      !parcel.receiverInfo?.location?.lat ||
      !parcel.receiverInfo?.location?.lng
    ) {
      toast.error("Location not available for this parcel");
      return;
    }
    setSelectedParcel(parcel);
    setShowNavigation(true);
  };

  // Handle view parcel details (now update status)
  const handleViewDetails = (parcel) => {
    setSelectedParcel(parcel);
    setShowUpdateStatus(true);
  };

  // Handle status update
  const handleStatusUpdated = (parcelId, newStatus) => {
    // Update the parcel status in the data
    if (data?.parcels) {
      const updatedParcels = data.parcels.map((parcel) =>
        parcel.id === parcelId || parcel._id === parcelId
          ? { ...parcel, status: newStatus }
          : parcel
      );
      setData({ ...data, parcels: updatedParcels });
    }

    // Refresh dashboard data to get updated statistics
    fetchDashboardData();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <AgentDashboardHeader />

      <AgentStatsCards statistics={data?.statistics} loading={loading} />

      <AssignedParcels
        parcels={data?.parcels}
        loading={loading}
        onNavigate={handleNavigate}
        onViewDetails={handleViewDetails}
      />

      {/* Navigation Modal */}
      {showNavigation && selectedParcel && (
        <NavigationMap
          parcel={selectedParcel}
          onClose={() => {
            setShowNavigation(false);
            setSelectedParcel(null);
          }}
        />
      )}

      {/* Update Status Modal */}
      {showUpdateStatus && selectedParcel && (
        <UpdateStatusModal
          parcel={selectedParcel}
          onClose={() => {
            setShowUpdateStatus(false);
            setSelectedParcel(null);
          }}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
}

export default AgentDashboardHome;
