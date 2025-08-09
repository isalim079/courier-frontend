import { useState } from 'react';
import { 
    BarChart3, 
    TrendingUp, 
    Download, 
    Calendar,
    DollarSign,
    Package,
    Users,
    Clock,
    MapPin,
    Activity,
    Filter
} from 'lucide-react';

function Reports() {
    const [dateRange, setDateRange] = useState('last30days');
    const [reportType, setReportType] = useState('overview');

    // Mock data for reports
    const overviewStats = {
        totalRevenue: '$45,230',
        revenueChange: '+18%',
        totalBookings: 1234,
        bookingsChange: '+12%',
        activeAgents: 23,
        agentsChange: '+5%',
        avgDeliveryTime: '4.2 hours',
        timeChange: '-8%'
    };

    const monthlyData = [
        { month: 'Jan', revenue: 35000, bookings: 850, deliveries: 820 },
        { month: 'Feb', revenue: 42000, bookings: 920, deliveries: 900 },
        { month: 'Mar', revenue: 38000, bookings: 890, deliveries: 870 },
        { month: 'Apr', revenue: 45000, bookings: 980, deliveries: 960 },
        { month: 'May', revenue: 52000, bookings: 1100, deliveries: 1080 },
        { month: 'Jun', revenue: 48000, bookings: 1050, deliveries: 1020 }
    ];

    const topRoutes = [
        { route: 'New York → Boston', bookings: 156, revenue: '$18,750' },
        { route: 'Los Angeles → San Francisco', bookings: 134, revenue: '$16,080' },
        { route: 'Chicago → Detroit', bookings: 112, revenue: '$13,440' },
        { route: 'Miami → Orlando', bookings: 98, revenue: '$11,760' },
        { route: 'Seattle → Portland', bookings: 87, revenue: '$10,440' }
    ];

    const topAgents = [
        { name: 'John Smith', deliveries: 245, rating: 4.8, revenue: '$29,400' },
        { name: 'Emma Wilson', deliveries: 189, rating: 4.9, revenue: '$22,680' },
        { name: 'David Johnson', deliveries: 312, rating: 4.7, revenue: '$37,440' },
        { name: 'Sarah Martinez', deliveries: 156, rating: 4.6, revenue: '$18,720' }
    ];

    const recentActivity = [
        { time: '2 hours ago', event: 'Large order completed', details: 'CPM156 - $450 delivery to Boston' },
        { time: '4 hours ago', event: 'New agent registered', details: 'Michael Brown joined the team' },
        { time: '6 hours ago', event: 'Peak delivery time', details: '23 simultaneous deliveries in progress' },
        { time: '8 hours ago', event: 'Monthly target achieved', details: 'Revenue target of $45k reached' }
    ];

    const exportReport = () => {
        console.log(`Exporting ${reportType} report for ${dateRange}`);
        alert('Report exported successfully!');
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Reports & Analytics
                        </h1>
                        <p className="text-gray-600">
                            Comprehensive insights into your courier operations
                        </p>
                    </div>
                    <button 
                        onClick={exportReport}
                        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="last7days">Last 7 Days</option>
                                <option value="last30days">Last 30 Days</option>
                                <option value="last3months">Last 3 Months</option>
                                <option value="last6months">Last 6 Months</option>
                                <option value="lastyear">Last Year</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="overview">Overview</option>
                                <option value="revenue">Revenue</option>
                                <option value="performance">Performance</option>
                                <option value="agents">Agents</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-500 p-3 rounded-lg">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            {overviewStats.revenueChange}
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                            {overviewStats.totalRevenue}
                        </p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            {overviewStats.bookingsChange}
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                            {overviewStats.totalBookings}
                        </p>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-500 p-3 rounded-lg">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            {overviewStats.agentsChange}
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                            {overviewStats.activeAgents}
                        </p>
                        <p className="text-sm text-gray-600">Active Agents</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-500 p-3 rounded-lg">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            {overviewStats.timeChange}
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                            {overviewStats.avgDeliveryTime}
                        </p>
                        <p className="text-sm text-gray-600">Avg Delivery Time</p>
                    </div>
                </div>
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Performance Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            <span>Monthly Performance</span>
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {monthlyData.map((month) => (
                                <div key={month.month} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-medium text-gray-900 w-8">{month.month}</span>
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(month.revenue / 60000) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${month.revenue.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">{month.bookings} bookings</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Routes */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-green-600" />
                            <span>Top Routes</span>
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {topRoutes.map((route, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{route.route}</p>
                                        <p className="text-sm text-gray-500">{route.bookings} bookings</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{route.revenue}</p>
                                        <div className="flex items-center space-x-1">
                                            <TrendingUp className="h-3 w-3 text-green-500" />
                                            <span className="text-xs text-green-600">+12%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Agents */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <Users className="h-5 w-5 text-orange-600" />
                            <span>Top Performing Agents</span>
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {topAgents.map((agent, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">
                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{agent.name}</p>
                                            <p className="text-sm text-gray-500">{agent.deliveries} deliveries</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{agent.revenue}</p>
                                        <p className="text-sm text-gray-500">★ {agent.rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-purple-600" />
                            <span>Recent Activity</span>
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex space-x-3">
                                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.event}</p>
                                        <p className="text-sm text-gray-600">{activity.details}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
