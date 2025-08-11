import { Package } from "lucide-react";

function DeliveryHistoryHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Package className="h-6 w-6" />
          Delivery History
        </h1>
        <p className="text-gray-600">
          Review your completed deliveries and track performance metrics
        </p>
      </div>
    </div>
  );
}

export default DeliveryHistoryHeader;
