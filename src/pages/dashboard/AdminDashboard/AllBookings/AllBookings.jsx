import { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    Eye, 
    Edit,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Package,
    MapPin,
    Clock,
    User
} from 'lucide-react';

function AllBookings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [itemsPerPage] = useState(10);

    // Mock data - replace with actual API data
    const allBookings = [
        {
            id: 'CPM001',
            customer: 'John Doe',
            customerEmail: 'john@example.com',
            pickup: 'New York, NY',
            delivery: 'Boston, MA',
            status: 'delivered',
            amount: '$125',
            date: '2025-01-08',
            agent: 'Agent Smith',
            weight: '2.5 kg',
            priority: 'standard'
        },
        {
            id: 'CPM002',
            customer: 'Jane Smith',
            customerEmail: 'jane@example.com',
            pickup: 'Chicago, IL',
            delivery: 'Detroit, MI',
            status: 'in-transit',
            amount: '$89',
            date: '2025-01-08',
            agent: 'Agent Johnson',
            weight: '1.8 kg',
            priority: 'express'
        },
        {
            id: 'CPM003',
            customer: 'Mike Johnson',
            customerEmail: 'mike@example.com',
            pickup: 'Los Angeles, CA',
            delivery: 'San Francisco, CA',
            status: 'pending',
            amount: '$200',
            date: '2025-01-07',
            agent: 'Unassigned',
            weight: '5.0 kg',
            priority: 'standard'
        },
        {
            id: 'CPM004',
            customer: 'Sarah Wilson',
            customerEmail: 'sarah@example.com',
            pickup: 'Miami, FL',
            delivery: 'Orlando, FL',
            status: 'delivered',
            amount: '$156',
            date: '2025-01-07',
            agent: 'Agent Brown',
            weight: '3.2 kg',
            priority: 'express'
        },
        // Add more mock data to demonstrate pagination
        ...Array.from({ length: 46 }, (_, i) => ({
            id: `CPM${String(i + 5).padStart(3, '0')}`,
            customer: `Customer ${i + 5}`,
            customerEmail: `customer${i + 5}@example.com`,
            pickup: 'Sample City, ST',
            delivery: 'Destination City, ST',
            status: ['pending', 'in-transit', 'delivered', 'cancelled'][i % 4],
            amount: `$${Math.floor(Math.random() * 300) + 50}`,
            date: '2025-01-06',
            agent: i % 3 === 0 ? 'Unassigned' : `Agent ${i + 1}`,
            weight: `${(Math.random() * 10 + 0.5).toFixed(1)} kg`,
            priority: ['standard', 'express'][i % 2]
        }))
    ];

    // Filter bookings based on search and status
    const filteredBookings = allBookings.filter(booking => {
        const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.delivery.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBookings = filteredBookings.slice(startIndex, endIndex);

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'delivered':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'in-transit':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getPriorityBadge = (priority) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        return priority === 'express' 
            ? `${baseClasses} bg-orange-100 text-orange-800`
            : `${baseClasses} bg-gray-100 text-gray-800`;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            All Bookings
                        </h1>
                        <p className="text-gray-600">
                            Manage and track all courier bookings
                        </p>
                    </div>
                    <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>New Booking</span>
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
                                    placeholder="Search bookings..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>
                        
                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        
                        {/* Export Button */}
                        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Booking ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Route</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Agent</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            <Package className="h-4 w-4 text-orange-600" />
                                            <span className="font-medium text-gray-900">{booking.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-gray-900">{booking.customer}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-1 text-sm">
                                                <MapPin className="h-3 w-3 text-green-500" />
                                                <span className="text-gray-600">{booking.pickup}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm">
                                                <MapPin className="h-3 w-3 text-red-500" />
                                                <span className="text-gray-600">{booking.delivery}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={getStatusBadge(booking.status)}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={getPriorityBadge(booking.priority)}>
                                            {booking.priority}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="font-medium text-gray-900">{booking.amount}</span>
                                        <p className="text-sm text-gray-500">{booking.weight}</p>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={booking.agent === 'Unassigned' ? 'text-red-600' : 'text-gray-900'}>
                                            {booking.agent}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length} results
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span>Previous</span>
                            </button>
                            
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNumber;
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNumber = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNumber = totalPages - 4 + i;
                                    } else {
                                        pageNumber = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-3 py-1 text-sm rounded-md ${
                                                currentPage === pageNumber
                                                    ? 'bg-orange-600 text-white'
                                                    : 'border border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllBookings;
