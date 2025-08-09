import { useState } from 'react';
import { 
    Package, 
    Search, 
    Filter, 
    MapPin, 
    Clock, 
    Phone,
    User,
    Navigation,
    CheckCircle,
    AlertCircle,
    Eye
} from 'lucide-react';

function AssignedParcels() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const parcels = [
        {
            id: 'PKG001',
            trackingNumber: 'CPMS2025001',
            customerName: 'John Smith',
            customerPhone: '+1 (555) 123-4567',
            pickupAddress: '123 Business St, Downtown',
            deliveryAddress: '456 Home Ave, Suburb',
            packageType: 'Document',
            weight: '0.5 kg',
            status: 'pending_pickup',
            priority: 'high',
            assignedAt: '2025-08-09 08:00 AM',
            estimatedDelivery: '2025-08-09 02:00 PM',
            specialInstructions: 'Ring doorbell twice, fragile documents'
        },
        {
            id: 'PKG002',
            trackingNumber: 'CPMS2025002',
            customerName: 'Sarah Johnson',
            customerPhone: '+1 (555) 987-6543',
            pickupAddress: '789 Store Rd, Mall Area',
            deliveryAddress: '321 Residential Blvd, Uptown',
            packageType: 'Electronics',
            weight: '2.3 kg',
            status: 'picked_up',
            priority: 'normal',
            assignedAt: '2025-08-09 07:30 AM',
            estimatedDelivery: '2025-08-09 01:30 PM',
            specialInstructions: 'Handle with care, signature required'
        },
        {
            id: 'PKG003',
            trackingNumber: 'CPMS2025003',
            customerName: 'Michael Brown',
            customerPhone: '+1 (555) 456-7890',
            pickupAddress: '555 Warehouse Ave, Industrial',
            deliveryAddress: '888 Office Plaza, Business District',
            packageType: 'Documents',
            weight: '1.0 kg',
            status: 'in_transit',
            priority: 'urgent',
            assignedAt: '2025-08-09 09:00 AM',
            estimatedDelivery: '2025-08-09 12:00 PM',
            specialInstructions: 'Office hours only, deliver to reception'
        },
        {
            id: 'PKG004',
            trackingNumber: 'CPMS2025004',
            customerName: 'Emily Davis',
            customerPhone: '+1 (555) 321-0987',
            pickupAddress: '222 Shop St, Commercial',
            deliveryAddress: '777 Family Lane, Residential',
            packageType: 'Clothing',
            weight: '1.8 kg',
            status: 'delivered',
            priority: 'normal',
            assignedAt: '2025-08-09 06:00 AM',
            estimatedDelivery: '2025-08-09 11:00 AM',
            specialInstructions: 'Leave with neighbor if not home'
        }
    ];

    const filteredParcels = parcels.filter(parcel => {
        const matchesSearch = parcel.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            parcel.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || parcel.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending_pickup': return 'bg-red-100 text-red-800 border-red-200';
            case 'picked_up': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'normal': return 'bg-blue-500';
            case 'low': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending_pickup': return <AlertCircle className="h-4 w-4" />;
            case 'picked_up': return <Package className="h-4 w-4" />;
            case 'in_transit': return <Navigation className="h-4 w-4" />;
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Assigned Parcels
                </h1>
                <p className="text-gray-600">
                    Manage all parcels assigned to you for delivery
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search by customer name, tracking number, or package ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending_pickup">Pending Pickup</option>
                                <option value="picked_up">Picked Up</option>
                                <option value="in_transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div className="flex items-center space-x-2">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Priority</option>
                                <option value="urgent">Urgent</option>
                                <option value="high">High</option>
                                <option value="normal">Normal</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Parcels List */}
            <div className="space-y-4">
                {filteredParcels.map((parcel) => (
                    <div key={parcel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 md:p-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(parcel.priority)}`}></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{parcel.trackingNumber}</h3>
                                        <p className="text-sm text-gray-600">ID: {parcel.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(parcel.status)}`}>
                                        {getStatusIcon(parcel.status)}
                                        <span>{parcel.status.replace('_', ' ').toUpperCase()}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <User className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium text-gray-900">{parcel.customerName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{parcel.customerPhone}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Package className="h-4 w-4 text-gray-400" />
                                        <span>{parcel.packageType} ({parcel.weight})</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>ETA: {parcel.estimatedDelivery}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <h4 className="font-medium text-gray-900 mb-2">Pickup Address</h4>
                                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <span>{parcel.pickupAddress}</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <span>{parcel.deliveryAddress}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Special Instructions */}
                            {parcel.specialInstructions && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                    <h4 className="font-medium text-blue-900 mb-1">Special Instructions</h4>
                                    <p className="text-sm text-blue-800">{parcel.specialInstructions}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <Navigation className="h-4 w-4" />
                                    <span>Navigate to Pickup</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Update Status</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredParcels.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels found</h3>
                    <p className="text-gray-600">No parcels match your current filters.</p>
                </div>
            )}
        </div>
    );
}

export default AssignedParcels;
