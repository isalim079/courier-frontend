import { User } from "lucide-react";

function SenderForm({ register, errors }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="h-5 w-5 text-green-600 mr-2" />
        Sender Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            {...register("senderName", { 
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your full name"
          />
          {errors.senderName && (
            <p className="mt-1 text-sm text-red-600">{errors.senderName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register("senderPhone", { 
              required: "Phone number is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your phone number"
          />
          {errors.senderPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.senderPhone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            {...register("senderCity", { 
              required: "City is required",
              minLength: { value: 2, message: "City must be at least 2 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your city"
          />
          {errors.senderCity && (
            <p className="mt-1 text-sm text-red-600">{errors.senderCity.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            {...register("senderPostalCode", { 
              required: "Postal code is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter postal code"
          />
          {errors.senderPostalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.senderPostalCode.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            type="text"
            {...register("senderAddress1", { 
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters" }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your address"
          />
          {errors.senderAddress1 && (
            <p className="mt-1 text-sm text-red-600">{errors.senderAddress1.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            {...register("senderAddress2")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>
        <div className="hidden">
          <input type="hidden" {...register("senderLat")} />
          <input type="hidden" {...register("senderLng")} />
        </div>
      </div>
    </div>
  );
}

export default SenderForm;
