import { 
    Users, 
    Package, 
    TrendingUp, 
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
    DollarSign
} from 'lucide-react';

function DashboardHome() {
    const stats = [
        {
            title: 'Total Bookings',
            value: '1,234',
            change: '+12%',
            changeType: 'positive',
            icon: Package,
            color: 'bg-blue-500'
        },
        {
            title: 'Active Users',
            value: '856',
            change: '+5%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-green-500'
        },
        {
            title: 'Revenue',
            value: '$45,230',
            change: '+18%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-orange-500'
        },
        {
            title: 'Pending Orders',
            value: '23',
            change: '-8%',
            changeType: 'negative',
            icon: Clock,
            color: 'bg-yellow-500'
        }
    ];

    const recentBookings = [
        {
            id: 'CPM001',
            customer: 'John Doe',
            pickup: 'New York',
            delivery: 'Boston',
            status: 'delivered',
            amount: '$125'
        },
        {
            id: 'CPM002',
            customer: 'Jane Smith',
            pickup: 'Chicago',
            delivery: 'Detroit',
            status: 'in-transit',
            amount: '$89'
        },
        {
            id: 'CPM003',
            customer: 'Mike Johnson',
            pickup: 'LA',
            delivery: 'San Francisco',
            status: 'pending',
            amount: '$200'
        },
        {
            id: 'CPM004',
            customer: 'Sarah Wilson',
            pickup: 'Miami',
            delivery: 'Orlando',
            status: 'delivered',
            amount: '$156'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'in-transit':
                return <Activity className="h-4 w-4 text-blue-500" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-red-500" />;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'delivered':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'in-transit':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            default:
                return `${baseClasses} bg-red-100 text-red-800`;
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600">
                    Welcome back! Here's what's happening with your courier service.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <span
                                    className={`text-sm font-medium ${
                                        stat.changeType === 'positive' 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                    }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Bookings
                            </h2>
                            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                                View All
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(booking.status)}
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {booking.id}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {booking.customer}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {booking.pickup} → {booking.delivery}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            {booking.amount}
                                        </p>
                                        <span className={getStatusBadge(booking.status)}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Quick Actions
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <Package className="h-5 w-5 text-orange-600" />
                                    <span className="font-medium text-gray-900">
                                        Create New Booking
                                    </span>
                                </div>
                                <TrendingUp className="h-4 w-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium text-gray-900">
                                        Manage Agents
                                    </span>
                                </div>
                                <TrendingUp className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <Activity className="h-5 w-5 text-green-600" />
                                    <span className="font-medium text-gray-900">
                                        View Reports
                                    </span>
                                </div>
                                <TrendingUp className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
