import { useState } from 'react';
import { 
    Search, 
    Filter, 
    UserPlus, 
    Eye, 
    Edit,
    Trash2,
    Mail,
    Phone,
    Calendar,
    MapPin,
    User,
    MoreVertical
} from 'lucide-react';

function AllUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data for users
    const allUsers = [
        {
            id: 'USR001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            role: 'customer',
            status: 'active',
            joinDate: '2024-12-15',
            location: 'New York, NY',
            totalBookings: 12,
            totalSpent: '$1,450',
            lastActive: '2025-01-08'
        },
        {
            id: 'USR002',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 (555) 234-5678',
            role: 'customer',
            status: 'active',
            joinDate: '2024-11-20',
            location: 'Los Angeles, CA',
            totalBookings: 8,
            totalSpent: '$890',
            lastActive: '2025-01-07'
        },
        {
            id: 'AGT001',
            name: 'Mike Johnson',
            email: 'mike.johnson@cpms.com',
            phone: '+1 (555) 345-6789',
            role: 'agent',
            status: 'active',
            joinDate: '2024-10-10',
            location: 'Chicago, IL',
            totalDeliveries: 156,
            rating: '4.8',
            lastActive: '2025-01-08'
        },
        {
            id: 'AGT002',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@cpms.com',
            phone: '+1 (555) 456-7890',
            role: 'agent',
            status: 'active',
            joinDate: '2024-09-05',
            location: 'Miami, FL',
            totalDeliveries: 89,
            rating: '4.6',
            lastActive: '2025-01-08'
        },
        {
            id: 'ADM001',
            name: 'Robert Brown',
            email: 'robert.brown@cpms.com',
            phone: '+1 (555) 567-8901',
            role: 'admin',
            status: 'active',
            joinDate: '2024-08-01',
            location: 'San Francisco, CA',
            lastActive: '2025-01-08'
        },
        {
            id: 'USR003',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            phone: '+1 (555) 678-9012',
            role: 'customer',
            status: 'inactive',
            joinDate: '2024-07-15',
            location: 'Seattle, WA',
            totalBookings: 3,
            totalSpent: '$245',
            lastActive: '2024-12-20'
        },
        // Add more mock data
        ...Array.from({ length: 15 }, (_, i) => ({
            id: `USR${String(i + 4).padStart(3, '0')}`,
            name: `User ${i + 4}`,
            email: `user${i + 4}@example.com`,
            phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
            role: ['customer', 'agent'][i % 2],
            status: ['active', 'inactive'][i % 3 === 0 ? 1 : 0],
            joinDate: '2024-06-01',
            location: ['Dallas, TX', 'Boston, MA', 'Denver, CO', 'Phoenix, AZ'][i % 4],
            totalBookings: Math.floor(Math.random() * 20) + 1,
            totalSpent: `$${Math.floor(Math.random() * 2000) + 100}`,
            lastActive: '2025-01-05'
        }))
    ];

    // Filter users based on search, role, and status
    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadge = (role) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (role) {
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

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        return status === 'active'
            ? `${baseClasses} bg-green-100 text-green-800`
            : `${baseClasses} bg-red-100 text-red-800`;
    };

    const handleViewUser = (userId) => {
        console.log(`Viewing user: ${userId}`);
    };

    const handleEditUser = (userId) => {
        console.log(`Editing user: ${userId}`);
    };

    const handleDeleteUser = (userId) => {
        console.log(`Deleting user: ${userId}`);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
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
                    <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <UserPlus className="h-4 w-4" />
                        <span>Add User</span>
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                        
                        {/* Role Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="customer">Customer</option>
                                <option value="agent">Agent</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        
                        {/* Status Filter */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredUsers.map((user) => (
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
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
                                    <span className={getStatusBadge(user.status)}>
                                        {user.status}
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
                                    <Phone className="h-4 w-4" />
                                    <span>{user.phone}</span>
                                </div>
                                
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{user.location}</span>
                                </div>
                                
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined {user.joinDate}</span>
                                </div>
                            </div>

                            {/* Role-specific stats */}
                            {user.role === 'customer' && (
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Bookings</p>
                                            <p className="font-medium text-gray-900">{user.totalBookings}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Total Spent</p>
                                            <p className="font-medium text-gray-900">{user.totalSpent}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.role === 'agent' && (
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Deliveries</p>
                                            <p className="font-medium text-gray-900">{user.totalDeliveries}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Rating</p>
                                            <p className="font-medium text-gray-900">{user.rating} ★</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Actions */}
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    Last active: {user.lastActive}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() => handleViewUser(user.id)}
                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                        title="View user"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleEditUser(user.id)}
                                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                        title="Edit user"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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

            {/* No results message */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No users found</p>
                    <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
}

export default AllUsers;
