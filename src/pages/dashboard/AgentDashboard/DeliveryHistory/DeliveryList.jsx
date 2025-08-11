import { Package } from "lucide-react";
import DeliveryCard from "./DeliveryCard";

function DeliveryList({ deliveries }) {
  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No delivery history found</h3>
        <p className="text-gray-600">No deliveries match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.id} delivery={delivery} />
      ))}
    </div>
  );
}

export default DeliveryList;
