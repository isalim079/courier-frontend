import { useState, useEffect } from "react";
import { X } from "lucide-react";

function AssignAgentModal({
  isOpen,
  onClose,
  parcel,
  agents,
  onAssignAgent,
  loading,
}) {
  const [selectedAgentId, setSelectedAgentId] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedAgentId("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAgentId && parcel) {
      onAssignAgent(parcel.id, selectedAgentId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Assign Agent to Parcel
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Parcel ID:{" "}
              <span className="font-medium">{parcel?.trackingId}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Customer:{" "}
              <span className="font-medium">{parcel?.customer?.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              Current Agent:{" "}
              <span className="font-medium">
                {parcel?.assignedAgent?.name || "Unassigned"}
              </span>
            </p>
          </div>

          {/* Agent Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Agent
            </label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer"
              required
            >
              <option value="">Choose an agent...</option>
              {agents.map((agent, index) => (
                <option key={index} value={agent.id}>
                  {agent.name} - {agent.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedAgentId || loading}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? "Assigning..." : "Assign Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignAgentModal;
