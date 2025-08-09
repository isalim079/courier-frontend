import { MapPin } from "lucide-react";

function RecipientForm({ formData, onInputChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        Recipient Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.recipientName}
            onChange={(e) => onInputChange("", "recipientName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.recipientPhone}
            onChange={(e) => onInputChange("", "recipientPhone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.recipientEmail}
            onChange={(e) => onInputChange("", "recipientEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.recipientCity}
            onChange={(e) => onInputChange("", "recipientCity", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's city"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complete Address *
          </label>
          <textarea
            required
            rows={3}
            value={formData.recipientAddress}
            onChange={(e) => onInputChange("", "recipientAddress", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's complete address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PIN Code *
          </label>
          <input
            type="text"
            required
            value={formData.recipientPincode}
            onChange={(e) => onInputChange("", "recipientPincode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter PIN code"
          />
        </div>
      </div>
    </div>
  );
}

export default RecipientForm;
