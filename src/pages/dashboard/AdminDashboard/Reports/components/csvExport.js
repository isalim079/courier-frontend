// Utility function to export data as CSV
export const exportToCSV = (data, filename, reportType) => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  let csvContent = "";
  let headers = [];
  let rows = [];

  switch (reportType) {
    case "bookings":
      headers = [
        "Tracking ID",
        "Sender Name",
        "Sender City",
        "Receiver Name",
        "Receiver City",
        "Status",
        "Payment Amount",
        "Assigned Agent",
      ];

      rows = data.map((booking) => [
        booking.trackingId || "",
        booking.senderInfo?.name || "",
        booking.senderInfo?.city || "",
        booking.receiverInfo?.name || "",
        booking.receiverInfo?.city || "",
        booking.status || "",
        booking.payment?.codAmount || "",
        booking.assignedAgent?.name || "Not Assigned",
      ]);
      break;

    case "users":
      headers = ["Name", "Email", "Role", "Status"];

      rows = data.map((user) => [
        user.name || "",
        user.email || "",
        user.role || "",
        new Date(user.createdAt).toLocaleDateString(),
        "Active",
      ]);
      break;

    case "agents":
      headers = [
        "Agent Name",
        "Email",
        "Assigned Bookings",
        "Completed Deliveries",
        "Success Rate (%)",
        "Join Date",
      ];

      rows = data.map((agent) => [
        agent.name || "",
        agent.email || "",
        agent.assignedCount || 0,
        agent.completedCount || 0,
        agent.completionRate ? agent.completionRate.toFixed(1) : "0.0",
      ]);
      break;

    case "revenue":
      headers = [
        "Date",
        "Total Revenue",
        "Total Bookings",
        "Average Order Value",
      ];

      // This would be based on grouped data by date
      rows = data.map((item) => [
        item.date || "",
        item.revenue || 0,
        item.bookings || 0,
        item.avgOrderValue || 0,
      ]);
      break;

    default: // overview
      headers = ["Metric", "Value", "Description"];

      rows = [
        [
          "Total Revenue",
          `$${data.totalRevenue || 0}`,
          "Total revenue generated",
        ],
        ["Total Bookings", data.totalBookings || 0, "Total number of bookings"],
        ["Total Users", data.totalUsers || 0, "Total registered users"],
        ["Total Agents", data.totalAgents || 0, "Total active agents"],
        [
          "Pending Bookings",
          data.pendingBookings || 0,
          "Bookings awaiting pickup",
        ],
        [
          "In Transit",
          data.inTransitBookings || 0,
          "Bookings currently in transit",
        ],
        [
          "Delivered",
          data.deliveredBookings || 0,
          "Successfully delivered bookings",
        ],
      ];
      break;
  }

  // Create CSV content
  csvContent = headers.join(",") + "\n";

  rows.forEach((row) => {
    const csvRow = row
      .map((field) => {
        // Handle fields that might contain commas by wrapping in quotes
        if (typeof field === "string" && field.includes(",")) {
          return `"${field}"`;
        }
        return field;
      })
      .join(",");
    csvContent += csvRow + "\n";
  });

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Generate filename with current date
export const generateFilename = (reportType) => {
  const date = new Date().toISOString().split("T")[0];
  return `${reportType}-report-${date}.csv`;
};
