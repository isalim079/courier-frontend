import { Package } from "lucide-react";

function AssignInstructions({ selectedBooking }) {
  if (selectedBooking) return null;

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <Package className="h-5 w-5 text-blue-600" />
        <p className="text-blue-800 font-medium">
          Select a booking from the left panel to assign an agent
        </p>
      </div>
    </div>
  );
}

export default AssignInstructions;
