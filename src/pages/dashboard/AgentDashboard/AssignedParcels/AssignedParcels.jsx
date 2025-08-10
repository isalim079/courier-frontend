import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import Loading from "../../../../components/ui/Loading";

// Components
import AssignedParcelsHeader from "./components/AssignedParcelsHeader";
import ParcelFilters from "./components/ParcelFilters";
import ParcelsList from "./components/ParcelsList";
import UpdateStatusModal from "./components/UpdateStatusModal";
import NavigationMap from "./components/NavigationMap";

function AssignedParcels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
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

  // Filter parcels based on search and status
  const filteredParcels = (data?.parcels || []).filter(parcel => {
    const customerName = parcel.receiverInfo?.name || parcel.customerName || '';
    const trackingNumber = parcel.trackingId || parcel.trackingNumber || parcel.id || '';
    
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Handle navigation to parcel location
  const handleNavigate = (parcel) => {
    if (!parcel.receiverInfo?.location?.lat || !parcel.receiverInfo?.location?.lng) {
      toast.error("Location not available for this parcel");
      return;
    }
    setSelectedParcel(parcel);
    setShowNavigation(true);
  };

  // Handle update status
  const handleUpdateStatus = (parcel) => {
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
      <AssignedParcelsHeader />

      <ParcelFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ParcelsList 
        parcels={filteredParcels}
        loading={loading}
        onNavigate={handleNavigate}
        onUpdateStatus={handleUpdateStatus}
      />

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
    </div>
  );
}

export default AssignedParcels;
