function AssignAgentsHeader({ unassignedCount, availableAgentsCount }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Assign Agents
      </h1>
      <p className="text-gray-600 mb-4">
        Assign available agents to pending bookings
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-orange-600 font-bold text-sm">UP</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unassignedCount || 0}</p>
              <p className="text-sm text-gray-600">Unassigned Parcels</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-sm">AA</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{availableAgentsCount || 0}</p>
              <p className="text-sm text-gray-600">Available Agents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignAgentsHeader;
