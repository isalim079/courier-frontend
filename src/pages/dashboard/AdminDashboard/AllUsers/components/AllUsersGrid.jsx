import { Trash2, Mail, Phone, Calendar, Edit } from 'lucide-react';

function AllUsersGrid({ users, onDeleteUser }) {
  const getRoleBadge = (role) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role?.toLowerCase()) {
      case 'admin':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'agent':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'customer':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          {/* Card Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={getRoleBadge(user.role)}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>User ID: {user.id?.slice(-8) || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Role: {user.role}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Delete user"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllUsersGrid;
