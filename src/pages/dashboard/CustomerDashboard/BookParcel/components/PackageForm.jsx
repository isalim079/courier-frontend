import { Package } from "lucide-react";

function PackageForm({ register, errors, parcelTypes, weightRanges }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="h-5 w-5 text-green-600 mr-2" />
        Parcel Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parcel Type *
          </label>
          <select
            {...register("parcelType", { 
              required: "Parcel type is required"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select parcel type</option>
            {parcelTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.parcelType && (
            <p className="mt-1 text-sm text-red-600">{errors.parcelType.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight Range *
          </label>
          <select
            {...register("weightRange", { 
              required: "Weight range is required"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select weight range</option>
            {weightRanges.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
          {errors.weightRange && (
            <p className="mt-1 text-sm text-red-600">{errors.weightRange.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parcel Description *
          </label>
          <textarea
            {...register("description", { 
              required: "Description is required",
              minLength: { value: 10, message: "Description must be at least 10 characters" }
            })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the contents of your parcel"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions (Optional)
          </label>
          <textarea
            {...register("specialInstructions")}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Any special handling instructions (optional)"
          />
        </div>
      </div>
    </div>
  );
}

export default PackageForm;
