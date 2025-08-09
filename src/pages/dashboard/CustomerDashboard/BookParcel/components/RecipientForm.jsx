import { MapPin } from "lucide-react";

function RecipientForm({ register, errors }) {
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
            {...register("receiverName", { 
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's full name"
          />
          {errors.receiverName && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register("receiverPhone", { 
              required: "Phone number is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's phone number"
          />
          {errors.receiverPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverPhone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            {...register("receiverCity", { 
              required: "City is required",
              minLength: { value: 2, message: "City must be at least 2 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's city"
          />
          {errors.receiverCity && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverCity.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            {...register("receiverPostalCode", { 
              required: "Postal code is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter postal code"
          />
          {errors.receiverPostalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverPostalCode.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            type="text"
            {...register("receiverAddress1", { 
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient's address"
          />
          {errors.receiverAddress1 && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverAddress1.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            {...register("receiverAddress2")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>
        <div className="hidden">
          <input type="hidden" {...register("receiverLat")} />
          <input type="hidden" {...register("receiverLng")} />
        </div>
      </div>
    </div>
  );
}

export default RecipientForm;
