import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../../../API/useAxiosPublic";

// Components
import BookingHistoryHeader from "./components/BookingHistoryHeader";
import SummaryStats from "./components/SummaryStats";
import BookingFilters from "./components/BookingFilters";
import BookingsTable from "./components/BookingsTable";
import Pagination from "./components/Pagination";

function BookingHistory() {
  const navigate = useNavigate();
  const api = useAxiosPublic();

  // Data state
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = useCallback(async () => {
    try {
      const response = await api.get("/parcel/my-bookings");

      if (response.status === 200) {
        setAllBookings(response.data.data.parcels || []);
        console.log("Bookings fetched successfully:", response.data.data.parcels);
        // Debug: Log unique status values
        const statuses = [...new Set((response.data.data.parcels || []).map(p => p.status))];
        console.log("Unique status values from API:", statuses);
      } else {
        toast.error("Failed to load bookings data");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to load bookings data");
    }
  }, [api]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBookings();
    setIsRefreshing(false);
    toast.success("Bookings refreshed successfully");
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchBookings();
      setLoading(false);
    };

    loadInitialData();
  }, [fetchBookings]);

  // Filter bookings based on search and filters
  const filteredBookings = useMemo(() => {
    return allBookings.filter((booking) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        (booking.trackingId || booking._id || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (booking.receiverInfo?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (booking.receiverInfo?.address1 || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || 
        booking.status?.toLowerCase() === statusFilter.toLowerCase() ||
        booking.status?.toLowerCase().replace(/[_\s]/g, " ") === statusFilter.toLowerCase().replace(/[_\s]/g, " ");

      // Date filter
      let matchesDate = true;
      if (dateFilter !== "all") {
        const bookingDate = new Date(booking.createdAt);
        const now = new Date();

        switch (dateFilter) {
          case "today":
            matchesDate = bookingDate.toDateString() === now.toDateString();
            break;
          case "week": {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = bookingDate >= weekAgo;
            break;
          }
          case "month": {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = bookingDate >= monthAgo;
            break;
          }
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [allBookings, searchTerm, statusFilter, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter]);

  const handleTrackParcel = (trackingId) => {
    navigate(`/customer.dashboard/track-parcel?id=${trackingId}`);
  };

  const handleExportData = () => {
    if (!filteredBookings.length) {
      toast.error("No data to export");
      return;
    }

    const csvContent = [
      [
        "Tracking ID",
        "Recipient",
        "Address",
        "Status",
        "Date",
        "COD Amount",
      ].join(","),
      ...filteredBookings.map((booking) =>
        [
          booking.trackingId || booking._id,
          booking.receiverInfo?.name || "N/A",
          (booking.receiverInfo?.address1 || "N/A").replace(/,/g, ";"),
          booking.status,
          new Date(booking.createdAt).toLocaleDateString(),
          `$${booking.payment?.codAmount?.toFixed(2) || "0.00"}`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking-history.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BookingHistoryHeader
        onRefresh={handleRefresh}
        onExport={handleExportData}
        isRefreshing={isRefreshing}
        navigate={navigate}
      />

      <div className="p-6 space-y-6">
        <SummaryStats bookings={allBookings} loading={loading} />

        <BookingFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          filteredCount={filteredBookings.length}
          totalCount={allBookings.length}
        />

        <BookingsTable
          bookings={paginatedBookings}
          loading={loading}
          onTrackParcel={handleTrackParcel}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            filteredCount={filteredBookings.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default BookingHistory;
