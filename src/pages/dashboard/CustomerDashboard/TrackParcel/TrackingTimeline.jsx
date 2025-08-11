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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tracking Timeline
      </h3>
      <div className="space-y-4">
        {trackingData.timeline.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(event.status, event.completed)}
            </div>
            <div
              className={`flex-1 ${
                index < trackingData.timeline.length - 1
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
