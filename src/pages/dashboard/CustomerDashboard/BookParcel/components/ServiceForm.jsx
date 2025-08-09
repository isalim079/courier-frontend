import { DollarSign } from "lucide-react";

function ServiceForm({ formData, onInputChange, serviceTypes }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
        Service Options
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Speed
          </label>
          <div className="space-y-2">
            {serviceTypes.map((service) => (
              <label key={service.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="serviceType"
                  value={service.id}
                  checked={formData.serviceType === service.id}
                  onChange={(e) => onInputChange("", "serviceType", e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{service.name}</span>
                    <span className="text-lg font-bold text-green-600">${service.price}</span>
                  </div>
                  <span className="text-sm text-gray-500">{service.time}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date *
            </label>
            <input
              type="date"
              required
              value={formData.pickupDate}
              onChange={(e) => onInputChange("", "pickupDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time *
            </label>
            <select
              required
              value={formData.pickupTime}
              onChange={(e) => onInputChange("", "pickupTime", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select time</option>
              <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
              <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
              <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.insurance}
              onChange={(e) => onInputChange("", "insurance", e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Add insurance coverage (+1% of declared value, minimum $5)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.signatureRequired}
              onChange={(e) => onInputChange("", "signatureRequired", e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Require signature on delivery
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
