import { useState } from 'react';
import { 
    Package, 
    Clock, 
    CheckCircle, 
    Calendar,
    Search,
    Filter,
    Eye,
    MapPin,
    User,
    Star
} from 'lucide-react';

function DeliveryHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const deliveryHistory = [
        {
            id: 'DEL001',
            trackingNumber: 'CPMS2025001',
            customerName: 'John Smith',
            customerRating: 5,
            pickupAddress: '123 Business St, Downtown',
            deliveryAddress: '456 Home Ave, Suburb',
            packageType: 'Document',
            deliveredAt: '2025-08-08 02:30 PM',
            actualDeliveryTime: '2h 15min',
            estimatedTime: '2h 30min',
            status: 'delivered',
            customerFeedback: 'Excellent service! Package arrived on time and in perfect condition.',
            proofOfDelivery: 'signature_received',
            earnings: '$15.50'
        },
        {
            id: 'DEL002',
            trackingNumber: 'CPMS2025002',
            customerName: 'Sarah Johnson',
            customerRating: 4,
            pickupAddress: '789 Store Rd, Mall Area',
            deliveryAddress: '321 Residential Blvd, Uptown',
            packageType: 'Electronics',
            deliveredAt: '2025-08-08 11:45 AM',
            actualDeliveryTime: '1h 45min',
            estimatedTime: '2h 00min',
            status: 'delivered',
            customerFeedback: 'Good service, delivered earlier than expected.',
            proofOfDelivery: 'photo_taken',
            earnings: '$22.00'
        },
        {
            id: 'DEL003',
            trackingNumber: 'CPMS2025003',
            customerName: 'Michael Brown',
            customerRating: 5,
            pickupAddress: '555 Warehouse Ave, Industrial',
            deliveryAddress: '888 Office Plaza, Business District',
            packageType: 'Documents',
            deliveredAt: '2025-08-07 04:15 PM',
            actualDeliveryTime: '45min',
            estimatedTime: '1h 00min',
            status: 'delivered',
            customerFeedback: 'Very professional and courteous delivery agent.',
            proofOfDelivery: 'signature_received',
            earnings: '$18.75'
        },
        {
            id: 'DEL004',
            trackingNumber: 'CPMS2025004',
            customerName: 'Emily Davis',
            customerRating: 3,
            pickupAddress: '222 Shop St, Commercial',
            deliveryAddress: '777 Family Lane, Residential',
            packageType: 'Clothing',
            deliveredAt: '2025-08-07 01:20 PM',
            actualDeliveryTime: '2h 45min',
            estimatedTime: '2h 00min',
            status: 'delivered',
            customerFeedback: 'Delivery was a bit late but package was in good condition.',
            proofOfDelivery: 'photo_taken',
            earnings: '$16.25'
        },
        {
            id: 'DEL005',
            trackingNumber: 'CPMS2025005',
            customerName: 'David Wilson',
            customerRating: null,
            pickupAddress: '333 Business Park, Corporate',
            deliveryAddress: '666 Suburban Dr, Residential',
            packageType: 'Package',
            deliveredAt: '2025-08-06 03:45 PM',
            actualDeliveryTime: '3h 15min',
            estimatedTime: '2h 30min',
            status: 'failed_delivery',
            customerFeedback: 'Customer was not available for delivery.',
            proofOfDelivery: 'delivery_attempted',
            earnings: '$0.00'
        }
    ];

    const filteredHistory = deliveryHistory.filter(delivery => {
        const matchesSearch = delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            delivery.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
        
        let matchesDate = true;
        if (dateFilter !== 'all') {
            const deliveryDate = new Date(delivery.deliveredAt);
            const today = new Date();
            const diffTime = Math.abs(today - deliveryDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch (dateFilter) {
                case 'today':
                    matchesDate = diffDays <= 1;
                    break;
                case 'week':
                    matchesDate = diffDays <= 7;
                    break;
                case 'month':
                    matchesDate = diffDays <= 30;
                    break;
                default:
                    matchesDate = true;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'failed_delivery': return 'bg-red-100 text-red-800 border-red-200';
            case 'returned': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const renderStars = (rating) => {
        if (!rating) return <span className="text-gray-400">No rating</span>;
        
        return (
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                ))}
                <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
            </div>
        );
    };

    const totalEarnings = filteredHistory
        .filter(delivery => delivery.status === 'delivered')
        .reduce((sum, delivery) => sum + parseFloat(delivery.earnings.replace('$', '')), 0);

    const averageRating = filteredHistory
        .filter(delivery => delivery.customerRating)
        .reduce((sum, delivery, _, arr) => sum + delivery.customerRating / arr.length, 0);

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Delivery History
                </h1>
                <p className="text-gray-600">
                    Review your past deliveries, customer feedback, and performance metrics
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Package className="h-8 w-8 text-blue-500" />
                        <span className="text-2xl font-bold text-gray-900">
                            {filteredHistory.length}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">Total Deliveries</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <span className="text-2xl font-bold text-gray-900">
                            {filteredHistory.filter(d => d.status === 'delivered').length}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">Successful Deliveries</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Star className="h-8 w-8 text-yellow-500" />
                        <span className="text-2xl font-bold text-gray-900">
                            {averageRating ? averageRating.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="h-8 w-8 text-purple-500" />
                        <span className="text-2xl font-bold text-gray-900">
                            ${totalEarnings.toFixed(2)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
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
                                    placeholder="Search by customer name, tracking number..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Date Filter */}
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
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
                                <option value="delivered">Delivered</option>
                                <option value="failed_delivery">Failed Delivery</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery History List */}
            <div className="space-y-4">
                {filteredHistory.map((delivery) => (
                    <div key={delivery.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 md:p-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{delivery.trackingNumber}</h3>
                                        <p className="text-sm text-gray-600">ID: {delivery.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(delivery.status)}`}>
                                        {delivery.status === 'delivered' && <CheckCircle className="h-4 w-4 mr-1" />}
                                        {delivery.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                    <span className="text-sm font-medium text-green-600">
                                        {delivery.earnings}
                                    </span>
                                </div>
                            </div>

                            {/* Customer and Delivery Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium text-gray-900">{delivery.customerName}</span>
                                    </div>
                                    {renderStars(delivery.customerRating)}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>Delivered: {delivery.deliveredAt}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Package className="h-4 w-4 text-gray-400" />
                                        <span>{delivery.packageType}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-600">Actual Time</p>
                                    <p className="font-medium text-gray-900">{delivery.actualDeliveryTime}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Estimated Time</p>
                                    <p className="font-medium text-gray-900">{delivery.estimatedTime}</p>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <h4 className="font-medium text-blue-900 mb-1">Pickup Address</h4>
                                    <div className="flex items-start space-x-2 text-sm text-blue-800">
                                        <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                                        <span>{delivery.pickupAddress}</span>
                                    </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <h4 className="font-medium text-green-900 mb-1">Delivery Address</h4>
                                    <div className="flex items-start space-x-2 text-sm text-green-800">
                                        <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                                        <span>{delivery.deliveryAddress}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Feedback */}
                            {delivery.customerFeedback && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                    <h4 className="font-medium text-yellow-900 mb-1">Customer Feedback</h4>
                                    <p className="text-sm text-yellow-800">{delivery.customerFeedback}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No delivery history found</h3>
                    <p className="text-gray-600">No deliveries match your current filters.</p>
                </div>
            )}
        </div>
    );
}

export default DeliveryHistory;
