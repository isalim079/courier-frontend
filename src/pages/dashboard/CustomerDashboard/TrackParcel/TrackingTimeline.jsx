import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Clock 
} from "lucide-react";

function TrackingTimeline({ trackingData }) {
  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    switch (status) {
      case "Package Picked Up":
      case "Pending Pickup":
        return <Package className="h-5 w-5 text-blue-600" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "Out for Delivery":
        return <MapPin className="h-5 w-5 text-orange-600" />;
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  // Generate timeline based on actual parcel data
  const generateTimeline = () => {
    const timeline = [];
    const currentStatus = trackingData.status;
    const createdAt = new Date(trackingData.createdAt);
    const pickupSchedule = new Date(trackingData.pickupSchedule);
    const updatedAt = new Date(trackingData.updatedAt);

    // 1. Package Created/Booked
    timeline.push({
      status: "Package Booked",
      location: `${trackingData.senderInfo.city}`,
      timestamp: createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      description: `Package booked by ${trackingData.senderInfo.name}`,
      completed: true
    });

    // 2. Pickup Scheduled
    timeline.push({
      status: "Pickup Scheduled",
      location: `${trackingData.senderInfo.address1}, ${trackingData.senderInfo.city}`,
      timestamp: pickupSchedule.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric"
      }),
      description: "Package scheduled for pickup",
      completed: ["In Transit", "Out for Delivery", "Delivered"].includes(currentStatus)
    });

    // 3. Package Picked Up / In Transit
    if (["In Transit", "Out for Delivery", "Delivered"].includes(currentStatus)) {
      timeline.push({
        status: "Package Picked Up",
        location: `${trackingData.senderInfo.address1}, ${trackingData.senderInfo.city}`,
        timestamp: updatedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        description: `Package picked up by ${trackingData.assignedAgent?.name || "agent"}`,
        completed: true
      });
    }

    // 4. In Transit
    if (["In Transit", "Out for Delivery", "Delivered"].includes(currentStatus)) {
      timeline.push({
        status: "In Transit",
        location: trackingData.agentLocation ? 
          `Agent Location: ${trackingData.agentLocation.lat.toFixed(4)}, ${trackingData.agentLocation.lng.toFixed(4)}` :
          "En route to destination",
        timestamp: updatedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        description: currentStatus === "In Transit" ? 
          "Package is currently in transit" : 
          "Package was in transit",
        completed: currentStatus === "In Transit"
      });
    }

    // 5. Out for Delivery
    if (["Out for Delivery", "Delivered"].includes(currentStatus)) {
      const estimatedDelivery = new Date(pickupSchedule);
      estimatedDelivery.setDate(pickupSchedule.getDate() + 5); // Add 5 days

      timeline.push({
        status: "Out for Delivery",
        location: `${trackingData.receiverInfo.address1}, ${trackingData.receiverInfo.city}`,
        timestamp: currentStatus === "Out for Delivery" ? 
          "Today" : 
          estimatedDelivery.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short", 
            day: "numeric"
          }),
        description: currentStatus === "Out for Delivery" ?
          "Package is out for delivery" :
          "Package was out for delivery",
        completed: currentStatus === "Out for Delivery"
      });
    }

    // 6. Delivered
    timeline.push({
      status: "Delivered",
      location: `${trackingData.receiverInfo.address1}, ${trackingData.receiverInfo.city}`,
      timestamp: currentStatus === "Delivered" ? 
        updatedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) :
        "Pending",
      description: currentStatus === "Delivered" ?
        `Package delivered to ${trackingData.receiverInfo.name}` :
        `Will be delivered to ${trackingData.receiverInfo.name}`,
      completed: currentStatus === "Delivered"
    });

    return timeline;
  };

  const timeline = generateTimeline();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tracking Timeline
      </h3>
      <div className="space-y-4">
        {timeline.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(event.status, event.completed)}
            </div>
            <div
              className={`flex-1 ${
                index < timeline.length - 1
                  ? "border-l-2 border-gray-200 ml-2 pl-4 pb-4"
                  : "ml-2 pl-4"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h4
                  className={`font-medium ${
                    event.completed
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {event.status}
                </h4>
                <span
                  className={`text-sm ${
                    event.completed
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {event.timestamp}
                </span>
              </div>
              <p
                className={`text-sm ${
                  event.completed ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {event.description}
              </p>
              <p
                className={`text-sm font-medium ${
                  event.completed ? "text-green-600" : "text-gray-400"
                }`}
              >
                {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingTimeline;
