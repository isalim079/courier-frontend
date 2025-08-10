import { useState } from "react";
import { toast } from "react-hot-toast";
import { X, Package } from "lucide-react";
import useAxiosPublic from "../../../../../API/useAxiosPublic";

function UpdateStatusModal({ parcel, onClose, onStatusUpdated }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const api = useAxiosPublic();

  const statusOptions = [
    { value: "Picked Up", label: "Picked Up", color: "bg-yellow-100 text-yellow-800" },
    { value: "In Transit", label: "In Transit", color: "bg-blue-100 text-blue-800" },
    { value: "Delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "Failed", label: "Failed", color: "bg-red-100 text-red-800" },
  ];

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }

    try {
      setUpdating(true);
      const response = await api.put(`/parcel/update-status/${parcel.id}`, {
        status: selectedStatus,
      });

      if (response.status === 200) {
        toast.success("Status updated successfully");
        onStatusUpdated(parcel.id, selectedStatus);
        onClose();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
              <p className="text-sm text-gray-600">
                {parcel.trackingId || parcel.trackingNumber || parcel.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Customer:</p>
              <p className="font-medium text-gray-900">
                {parcel.receiverInfo?.name || parcel.customerName || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Status:</p>
              <p className="font-medium text-gray-900">{parcel.status}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select New Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateStatus}
            disabled={!selectedStatus || updating}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatusModal;
