import { Package } from "lucide-react";

function PackageForm({ formData, onInputChange, packageTypes }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="h-5 w-5 text-green-600 mr-2" />
        Package Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Type *
          </label>
          <select
            required
            value={formData.packageType}
            onChange={(e) => onInputChange("", "packageType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select package type</option>
            {packageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg) *
          </label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.weight}
            onChange={(e) => onInputChange("", "weight", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter weight in kg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions (cm)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={formData.dimensions.length}
              onChange={(e) => onInputChange("dimensions", "length", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Length"
            />
            <input
              type="number"
              value={formData.dimensions.width}
              onChange={(e) => onInputChange("dimensions", "width", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Width"
            />
            <input
              type="number"
              value={formData.dimensions.height}
              onChange={(e) => onInputChange("dimensions", "height", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Height"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Declared Value ($)
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => onInputChange("", "value", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter package value"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Description *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => onInputChange("", "description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the contents of your package"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions
          </label>
          <textarea
            rows={2}
            value={formData.specialInstructions}
            onChange={(e) => onInputChange("", "specialInstructions", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Any special handling instructions"
          />
        </div>
      </div>
    </div>
  );
}

export default PackageForm;
