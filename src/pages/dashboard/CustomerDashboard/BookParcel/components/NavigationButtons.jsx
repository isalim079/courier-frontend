function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  isSubmitting, 
  onPrevious, 
  onNext 
}) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
        >
          Previous
        </button>
      ) : (
        <div />
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium cursor-pointer"
        >
          Next Step
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Booking...</span>
            </>
          ) : (
            <span>Book Parcel</span>
          )}
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
