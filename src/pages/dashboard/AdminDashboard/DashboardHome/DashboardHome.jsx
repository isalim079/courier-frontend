import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import AdminDashboardHeader from "./components/AdminDashboardHeader";
import AdminStatsCards from "./components/AdminStatsCards";
import AdminRecentBookings from "./components/AdminRecentBookings";
import useAxiosPublic from "../../../../API/useAxiosPublic";

function DashboardHome() {
  const api = useAxiosPublic();

  // State for data
  const [parcelsData, setParcelsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch parcels data
  const fetchParcelsData = useCallback(async () => {
    try {
      const response = await api.get("/parcel/all-bookings");

      if (response.status === 200) {
        setParcelsData(response.data.data);
      } else {
        toast.error("Failed to load parcels data");
      }
    } catch (err) {
      console.error("Error fetching parcels data:", err);
      toast.error("Failed to load parcels data");
    }
  }, [api]);

  // Fetch users data
  const fetchUsersData = useCallback(async () => {
    try {
      const response = await api.get("/auth/all-users");
      if (response.data.success === true) {
        setUsersData(response.data.data);
      } else {
        toast.error("Failed to load users data");
      }
    } catch (err) {
      console.error("Error fetching users data:", err);
      toast.error("Failed to load users data");
    }
  }, [api]);

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchParcelsData(), fetchUsersData()]);
    } finally {
      setLoading(false);
    }
  }, [fetchParcelsData, fetchUsersData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  console.log(usersData);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <AdminDashboardHeader />

      <AdminStatsCards
        parcelsData={parcelsData}
        usersData={usersData}
        loading={loading}
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        <AdminRecentBookings
          bookings={parcelsData?.parcels}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default DashboardHome;
