import { DollarSign } from "lucide-react";
import { useEffect } from "react";

function PaymentForm({ register, errors, setValue }) {
  // Set default payment method to COD
  useEffect(() => {
    setValue("paymentMethod", "COD");
  }, [setValue]);

  // Get today's date for minimum pickup date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
        Payment & Schedule
      </h2>
      <div className="space-y-6">
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg bg-green-50 cursor-not-allowed">
              <input
                type="radio"
                {...register("paymentMethod")}
                value="COD"
                defaultChecked
                readOnly
                className="text-green-600 focus:ring-green-500 cursor-not-allowed"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                  <span className="text-sm text-green-600 font-medium">Selected</span>
                </div>
                <span className="text-sm text-gray-500">Pay when your parcel is delivered</span>
              </div>
            </label>
          </div>
        </div>

        {/* COD Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            COD Amount *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("codAmount", { 
              required: "COD amount is required",
              min: { value: 0, message: "Amount must be greater than or equal to 0" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter the amount to collect on delivery"
          />
          {errors.codAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.codAmount.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            This is the amount the recipient will pay when receiving the parcel
          </p>
        </div>

        {/* Pickup Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date *
          </label>
          <input
            type="date"
            min={today}
            {...register("pickupSchedule", { 
              required: "Pickup date is required"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {errors.pickupSchedule && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupSchedule.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Select when you want your parcel to be picked up
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
