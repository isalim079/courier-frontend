import { useState } from 'react';
import { 
    MapPin, 
    Navigation, 
    Clock, 
    Route,
    Car,
    Package,
    Phone,
    RefreshCw,
    Download,
    Maximize2
} from 'lucide-react';

function RouteMap() {
    const [selectedRoute, setSelectedRoute] = useState('route1');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const routes = [
        {
            id: 'route1',
            name: 'Morning Route',
            totalDistance: '12.5 km',
            estimatedTime: '2h 30min',
            deliveries: 5,
            status: 'active',
            optimizedAt: '08:00 AM',
            stops: [
                {
                    id: 'stop1',
                    order: 1,
                    type: 'pickup',
                    address: '123 Business St, Downtown',
                    customerName: 'ABC Company',
                    packageId: 'PKG001',
                    estimatedTime: '09:00 AM',
                    status: 'completed'
                },
                {
                    id: 'stop2',
                    order: 2,
                    type: 'delivery',
                    address: '456 Home Ave, Suburb',
                    customerName: 'John Smith',
                    packageId: 'PKG001',
                    estimatedTime: '09:30 AM',
                    status: 'pending'
                },
                {
                    id: 'stop3',
                    order: 3,
                    type: 'pickup',
                    address: '789 Store Rd, Mall Area',
                    customerName: 'XYZ Electronics',
                    packageId: 'PKG002',
                    estimatedTime: '10:00 AM',
                    status: 'pending'
                },
                {
                    id: 'stop4',
                    order: 4,
                    type: 'delivery',
                    address: '321 Residential Blvd, Uptown',
                    customerName: 'Sarah Johnson',
                    packageId: 'PKG002',
                    estimatedTime: '10:45 AM',
                    status: 'pending'
                },
                {
                    id: 'stop5',
                    order: 5,
                    type: 'delivery',
                    address: '888 Office Plaza, Business District',
                    customerName: 'Michael Brown',
                    packageId: 'PKG003',
                    estimatedTime: '11:30 AM',
                    status: 'pending'
                }
            ]
        },
        {
            id: 'route2',
            name: 'Afternoon Route',
            totalDistance: '8.2 km',
            estimatedTime: '1h 45min',
            deliveries: 3,
            status: 'planned',
            optimizedAt: '12:00 PM',
            stops: [
                {
                    id: 'stop6',
                    order: 1,
                    type: 'pickup',
                    address: '555 Warehouse Ave, Industrial',
                    customerName: 'Logistics Hub',
                    packageId: 'PKG004',
                    estimatedTime: '01:00 PM',
                    status: 'pending'
                },
                {
                    id: 'stop7',
                    order: 2,
                    type: 'delivery',
                    address: '777 Family Lane, Residential',
                    customerName: 'Emily Davis',
                    packageId: 'PKG004',
                    estimatedTime: '01:30 PM',
                    status: 'pending'
                },
                {
                    id: 'stop8',
                    order: 3,
                    type: 'delivery',
                    address: '999 Corporate Ave, Downtown',
                    customerName: 'Tech Solutions Inc',
                    packageId: 'PKG005',
                    estimatedTime: '02:15 PM',
                    status: 'pending'
                }
            ]
        }
    ];

    const currentRoute = routes.find(route => route.id === selectedRoute);

    const getStopStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500 text-white';
            case 'in_progress': return 'bg-blue-500 text-white';
            case 'pending': return 'bg-gray-300 text-gray-700';
            default: return 'bg-gray-300 text-gray-700';
        }
    };

    const getStopTypeIcon = (type) => {
        return type === 'pickup' ? <Package className="h-4 w-4" /> : <MapPin className="h-4 w-4" />;
    };

    const handleOptimizeRoute = () => {
        alert('Route optimization requested. This will integrate with Google Maps API in the backend.');
    };

    const handleStartNavigation = (stop) => {
        // This would integrate with Google Maps or device navigation
        alert(`Starting navigation to: ${stop.address}`);
    };

    const handleCallCustomer = (stop) => {
        // This would initiate a phone call
        alert(`Calling customer: ${stop.customerName}`);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Optimized Routes
                        </h1>
                        <p className="text-gray-600">
                            View and navigate your optimized delivery routes
                        </p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button 
                            onClick={handleOptimizeRoute}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Re-optimize</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Route Selection and Details */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Route Selector */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Select Route</h3>
                        <div className="space-y-2">
                            {routes.map((route) => (
                                <button
                                    key={route.id}
                                    onClick={() => setSelectedRoute(route.id)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                                        selectedRoute === route.id
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{route.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                {route.deliveries} stops • {route.totalDistance}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {route.status}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Route Summary */}
                    {currentRoute && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Route Summary</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Route className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Distance: {currentRoute.totalDistance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Est. Time: {currentRoute.estimatedTime}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{currentRoute.deliveries} deliveries</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RefreshCw className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Optimized at: {currentRoute.optimizedAt}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Map and Route Details */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Map Placeholder */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Route Map</h3>
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <Maximize2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className={`bg-gray-100 flex items-center justify-center ${isFullscreen ? 'h-96' : 'h-64'}`}>
                            <div className="text-center">
                                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h4 className="text-lg font-medium text-gray-900 mb-2">
                                    Interactive Route Map
                                </h4>
                                <p className="text-gray-600 mb-4">
                                    Google Maps integration will be implemented here
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto">
                                    <p className="text-sm text-blue-800">
                                        This will show your optimized route with turn-by-turn directions,
                                        real-time traffic updates, and stop markers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stop Details */}
                    {currentRoute && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Route Stops</h3>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {currentRoute.stops.map((stop) => (
                                        <div key={stop.id} className="flex items-start space-x-4 p-3 border border-gray-200 rounded-lg">
                                            <div className="flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStopStatusColor(stop.status)}`}>
                                                    <span className="text-sm font-medium">{stop.order}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    {getStopTypeIcon(stop.type)}
                                                    <span className="font-medium text-gray-900 capitalize">
                                                        {stop.type} - {stop.customerName}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">{stop.address}</p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>Package: {stop.packageId}</span>
                                                    <span>ETA: {stop.estimatedTime}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-shrink-0 flex space-x-2">
                                                <button 
                                                    onClick={() => handleStartNavigation(stop)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Navigate"
                                                >
                                                    <Navigation className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleCallCustomer(stop)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Call Customer"
                                                >
                                                    <Phone className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Car className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Start Navigation</h3>
                    <p className="text-sm text-gray-600 mb-3">Begin turn-by-turn navigation</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Start Route
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <RefreshCw className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Re-optimize Route</h3>
                    <p className="text-sm text-gray-600 mb-3">Update route based on traffic</p>
                    <button 
                        onClick={handleOptimizeRoute}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Optimize
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">View All Parcels</h3>
                    <p className="text-sm text-gray-600 mb-3">See detailed parcel information</p>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        View Parcels
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RouteMap;
