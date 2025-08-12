import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import Loading from "../../../../components/ui/Loading";

// Components
import ReportsHeader from "./components/ReportsHeader";
import ReportsStatsCards from "./components/ReportsStatsCards";
import BookingsChart from "./components/BookingsChart";
import AgentsPerformance from "./components/AgentsPerformance";
import RecentBookings from "./components/RecentBookings";

// Utils
import { exportToCSV, generateFilename } from "./components/csvExport";

function Reports() {
  const api = useAxiosPublic();

  // State
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);

  // Data state
  const [bookingsData, setBookingsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [reportsData, setReportsData] = useState(null);

  // Fetch all data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch data in parallel
      const [bookingsResponse, usersResponse] = await Promise.all([
        api.get("/parcel/all-bookings"),
        api.get("/auth/all-users"),
      ]);

      // Set bookings data
      if (bookingsResponse.data.success === true) {
        setBookingsData(bookingsResponse.data.data?.parcels || []);
      }

      // Set users data and filter agents
      if (usersResponse.data.success === true) {
        const allUsers = usersResponse.data.data?.totalUsers?.users || [];
        setUsersData(allUsers);

        // Filter agents
        const agents = usersResponse.data.data?.totalAgents?.users || [];
        setAgentsData(agents);
      }
    } catch (error) {
      console.error("Error fetching reports data:", error);
      toast.error("Failed to load reports data");
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Calculate reports data
  const calculateReportsData = useCallback(() => {
    if (!bookingsData.length && !usersData.length) return null;

    // Calculate revenue (sum of all payment amounts)
    const totalRevenue = bookingsData.reduce((sum, booking) => {
      return sum + (booking.payment?.amount || 0);
    }, 0);

    // Count bookings by status
    const statusCounts = bookingsData.reduce((acc, booking) => {
      const status = booking.status || "pending";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRevenue,
      totalBookings: bookingsData.length,
      totalUsers: usersData.length,
      totalAgents: agentsData.length,
      pendingBookings: statusCounts.pending || 0,
      inTransitBookings:
        (statusCounts["in-transit"] || 0) + (statusCounts["picked-up"] || 0),
      deliveredBookings: statusCounts.delivered || 0,
      cancelledBookings: statusCounts.cancelled || 0,
      bookings: bookingsData,
    };
  }, [bookingsData, usersData, agentsData]);

  // Update reports data when base data changes
  useEffect(() => {
    const calculated = calculateReportsData();
    setReportsData(calculated);
  }, [calculateReportsData]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle export report
  const handleExportReport = async () => {
    try {
      setExportLoading(true);

      if (!reportsData || !reportsData.bookings) {
        toast.error("No data available to export");
        return;
      }

      // Export all bookings data
      const filename = generateFilename("bookings");
      const dataToExport = reportsData.bookings;

      exportToCSV(dataToExport, filename, "bookings");
      toast.success("Report exported successfully!");
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("Failed to export report");
    } finally {
      setExportLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <ReportsHeader
        onExportReport={handleExportReport}
        loading={exportLoading}
      />
      <ReportsStatsCards reportsData={reportsData} loading={loading} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BookingsChart
          bookings={reportsData?.bookings || []}
          loading={loading}
        />

        <AgentsPerformance
          agents={agentsData}
          bookings={reportsData?.bookings || []}
          loading={loading}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RecentBookings
          bookings={reportsData?.bookings || []}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Reports;
