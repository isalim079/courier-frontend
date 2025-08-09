function PriceSummary({ formData, serviceTypes, calculatePrice }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Price Summary
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Base delivery cost:</span>
          <span className="font-medium">${serviceTypes.find(s => s.id === formData.serviceType)?.price || 15}</span>
        </div>
        {parseFloat(formData.weight) > 5 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Extra weight charge:</span>
            <span className="font-medium">${((parseFloat(formData.weight) - 5) * 2).toFixed(2)}</span>
          </div>
        )}
        {formData.insurance && (
          <div className="flex justify-between">
            <span className="text-gray-600">Insurance:</span>
            <span className="font-medium">${Math.max(5, (parseFloat(formData.value) || 0) * 0.01).toFixed(2)}</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-bold text-green-600">
          <span>Total Amount:</span>
          <span>${calculatePrice()}</span>
        </div>
      </div>
    </div>
  );
}

export default PriceSummary;
