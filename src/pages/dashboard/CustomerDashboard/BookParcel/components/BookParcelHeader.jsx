import { ArrowLeft } from "lucide-react";

function BookParcelHeader({ onBack }) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book New Parcel</h1>
            <p className="text-gray-600 mt-1">
              Fill in the details to book your parcel delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookParcelHeader;
