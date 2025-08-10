import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";

// Components
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import QuickActions from "./components/QuickActions";
import RecentBookings from "./components/RecentBookings";

function CustomerDashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useAxiosPublic();

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/parcel/my-bookings");

      if (res.status === 200) {
        setData(res.data.data);
      } else {
        toast.error("Failed to load bookings data");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);

      toast.error("Failed to load bookings data");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  console.log(data, "=> data");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards stats={data?.deliveryStats} total={data?.total} loading={loading} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Bookings */}
        <RecentBookings bookings={data?.parcels} loading={loading} />
      </div>
    </div>
  );
}

export default CustomerDashboardHome;
