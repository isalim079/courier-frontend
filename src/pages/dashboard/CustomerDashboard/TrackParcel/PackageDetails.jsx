import { Package } from "lucide-react";

function PackageDetails({ trackingData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="h-5 w-5 text-green-600 mr-2" />
        Package Details
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium text-gray-900">
            {trackingData.package.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium text-gray-900">
            {trackingData.package.weight}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Dimensions:</span>
          <span className="font-medium text-gray-900">
            {trackingData.package.dimensions}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Description:</span>
          <span className="font-medium text-gray-900">
            {trackingData.package.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
