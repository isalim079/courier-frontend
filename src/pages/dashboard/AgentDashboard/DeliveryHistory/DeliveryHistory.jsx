import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import DeliveryHistoryHeader from "./DeliveryHistoryHeader";
import DeliveryStats from "./DeliveryStats";
import DeliveryFilters from "./DeliveryFilters";
import DeliveryList from "./DeliveryList";
import useAxiosPublic from "../../../../API/useAxiosPublic";
import Loading from "../../../../components/ui/Loading";

function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const api = useAxiosPublic();

  const fetchDeliveryData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/parcel/agent-dashboard");

      if (response.data?.success) {
        const { parcels, statistics: stats } = response.data.data;
        // Filter only delivered parcels for delivery history
        const deliveredParcels = parcels.filter(
          (parcel) =>
            parcel.status === "Delivered" || parcel.status === "delivered"
        );
        setDeliveries(deliveredParcels);
        setStatistics(stats);
      }
    } catch (error) {
      console.error("Error fetching delivery data:", error);
      toast.error("Failed to load delivery history");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchDeliveryData();
  }, [fetchDeliveryData]);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.customer?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      delivery.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      delivery.status?.toLowerCase() === statusFilter.toLowerCase();

    let matchesDate = true;
    if (dateFilter !== "all" && delivery.pickupSchedule) {
      const deliveryDate = new Date(delivery.pickupSchedule);
      const today = new Date();
      const diffTime = Math.abs(today - deliveryDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case "today":
          matchesDate = diffDays <= 1;
          break;
        case "week":
          matchesDate = diffDays <= 7;
          break;
        case "month":
          matchesDate = diffDays <= 30;
          break;
        default:
          matchesDate = true;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <DeliveryHistoryHeader />

      <DeliveryStats statistics={statistics} />

      <DeliveryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <DeliveryList deliveries={filteredDeliveries} />
    </div>
  );
}

export default DeliveryHistory;
