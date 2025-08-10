function AllUsersHeader({ totalUsers, totalAdmins, totalCustomers, totalAgents }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            All Users
          </h1>
          <p className="text-gray-600">
            Manage customers, agents, and administrators
          </p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold text-sm">TU</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers || 0}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 font-bold text-sm">TC</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers || 0}</p>
              <p className="text-sm text-gray-600">Customers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-orange-600 font-bold text-sm">TA</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalAgents || 0}</p>
              <p className="text-sm text-gray-600">Agents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 font-bold text-sm">AD</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalAdmins || 0}</p>
              <p className="text-sm text-gray-600">Admins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersHeader;
