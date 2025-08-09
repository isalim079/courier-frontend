import { 
    Package, 
    MapPin, 
    Clock, 
    CheckCircle,
    AlertCircle,
    Eye,
    Navigation,
    Phone
} from 'lucide-react';

function AgentDashboardHome() {
    const stats = [
        {
            title: 'Assigned Today',
            value: '8',
            change: '+2 from yesterday',
            changeType: 'positive',
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            title: 'Completed Today',
            value: '5',
            change: '+1 from yesterday',
            changeType: 'positive',
            icon: CheckCircle,
            color: 'bg-green-500'
        },
        {
            title: 'In Progress',
            value: '3',
            change: 'Currently active',
            changeType: 'neutral',
            icon: Clock,
            color: 'bg-orange-500'
        },
        {
            title: 'Pending Pickup',
            value: '2',
            change: 'Awaiting pickup',
            changeType: 'warning',
            icon: AlertCircle,
            color: 'bg-red-500'
        }
    ];

    const todaysDeliveries = [
        {
            id: 'DEL001',
            customerName: 'John Smith',
            address: '123 Main St, Downtown',
            phone: '+1 (555) 123-4567',
            status: 'pending_pickup',
            priority: 'high',
            estimatedTime: '10:30 AM',
            packageType: 'Document'
        },
        {
            id: 'DEL002',
            customerName: 'Sarah Johnson',
            address: '456 Oak Ave, Midtown',
            phone: '+1 (555) 987-6543',
            status: 'in_transit',
            priority: 'normal',
            estimatedTime: '11:15 AM',
            packageType: 'Package'
        },
        {
            id: 'DEL003',
            customerName: 'Michael Brown',
            address: '789 Pine Rd, Uptown',
            phone: '+1 (555) 456-7890',
            status: 'delivered',
            priority: 'normal',
            estimatedTime: '12:00 PM',
            packageType: 'Fragile'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending_pickup': return 'bg-red-100 text-red-800';
            case 'in_transit': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'normal': return 'bg-blue-500';
            case 'low': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Agent Dashboard
                </h1>
                <p className="text-gray-600">
                    Welcome back! Here's your delivery overview for today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                <p className={`text-xs ${
                                    stat.changeType === 'positive' ? 'text-green-600' : 
                                    stat.changeType === 'warning' ? 'text-orange-600' : 'text-gray-500'
                                }`}>
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Today's Deliveries */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                            Today's Deliveries
                        </h3>
                        <div className="text-sm text-gray-500">
                            {todaysDeliveries.length} total deliveries
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {todaysDeliveries.map((delivery) => (
                            <div key={delivery.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(delivery.priority)}`}></div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{delivery.customerName}</h4>
                                                    <p className="text-sm text-gray-600">ID: {delivery.id}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                                                {delivery.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{delivery.address}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4" />
                                                <span>{delivery.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span>ETA: {delivery.estimatedTime}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Package className="h-4 w-4" />
                                                <span>{delivery.packageType}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-row lg:flex-col gap-2">
                                        <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                            <Eye className="h-4 w-4" />
                                            <span>View</span>
                                        </button>
                                        <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                            <Navigation className="h-4 w-4" />
                                            <span>Navigate</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">View Assigned Parcels</h3>
                    <p className="text-sm text-gray-600 mb-4">See all parcels assigned to you</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Parcels
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Update Status</h3>
                    <p className="text-sm text-gray-600 mb-4">Update delivery status</p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Update Status
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Navigation className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">View Routes</h3>
                    <p className="text-sm text-gray-600 mb-4">See optimized delivery routes</p>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        View Routes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AgentDashboardHome;
