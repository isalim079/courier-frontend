import { useState } from 'react';
import { 
    Search, 
    Filter, 
    UserPlus, 
    MapPin, 
    Clock,
    Package,
    User,
    Phone,
    Mail,
    Star,
    Activity,
    CheckCircle
} from 'lucide-react';

function AssignAgents() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Mock data for unassigned bookings
    const unassignedBookings = [
        {
            id: 'CPM003',
            customer: 'Mike Johnson',
            pickup: 'Los Angeles, CA',
            delivery: 'San Francisco, CA',
            amount: '$200',
            weight: '5.0 kg',
            priority: 'standard',
            date: '2025-01-08',
            distance: '380 miles',
            estimatedTime: '6 hours'
        },
        {
            id: 'CPM007',
            customer: 'Alice Brown',
            pickup: 'Seattle, WA',
            delivery: 'Portland, OR',
            amount: '$145',
            weight: '2.8 kg',
            priority: 'express',
            date: '2025-01-08',
            distance: '173 miles',
            estimatedTime: '3 hours'
        },
        {
            id: 'CPM012',
            customer: 'Robert Davis',
            pickup: 'Phoenix, AZ',
            delivery: 'Tucson, AZ',
            amount: '$89',
            weight: '1.5 kg',
            priority: 'standard',
            date: '2025-01-09',
            distance: '116 miles',
            estimatedTime: '2 hours'
        }
    ];

    // Mock data for available agents
    const availableAgents = [
        {
            id: 'AG001',
            name: 'John Smith',
            email: 'john.smith@cpms.com',
            phone: '+1 (555) 123-4567',
            rating: 4.8,
            totalDeliveries: 245,
            location: 'Los Angeles, CA',
            vehicle: 'Van',
            status: 'available',
            expertise: ['Express', 'Fragile Items'],
            capacity: '500 kg',
            workingHours: '8 AM - 6 PM'
        },
        {
            id: 'AG002',
            name: 'Emma Wilson',
            email: 'emma.wilson@cpms.com',
            phone: '+1 (555) 234-5678',
            rating: 4.9,
            totalDeliveries: 189,
            location: 'San Francisco, CA',
            vehicle: 'Motorcycle',
            status: 'available',
            expertise: ['Express', 'Same Day'],
            capacity: '50 kg',
            workingHours: '9 AM - 7 PM'
        },
        {
            id: 'AG003',
            name: 'David Johnson',
            email: 'david.johnson@cpms.com',
            phone: '+1 (555) 345-6789',
            rating: 4.7,
            totalDeliveries: 312,
            location: 'Seattle, WA',
            vehicle: 'Truck',
            status: 'available',
            expertise: ['Heavy Items', 'Long Distance'],
            capacity: '1000 kg',
            workingHours: '7 AM - 5 PM'
        },
        {
            id: 'AG004',
            name: 'Sarah Martinez',
            email: 'sarah.martinez@cpms.com',
            phone: '+1 (555) 456-7890',
            rating: 4.6,
            totalDeliveries: 156,
            location: 'Phoenix, AZ',
            vehicle: 'Car',
            status: 'busy',
            expertise: ['Standard', 'Documents'],
            capacity: '100 kg',
            workingHours: '8 AM - 6 PM'
        }
    ];

    const filteredAgents = availableAgents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            agent.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const handleAssignAgent = (bookingId, agentId) => {
        console.log(`Assigning agent ${agentId} to booking ${bookingId}`);
        // Add assignment logic here
        alert(`Agent assigned successfully!`);
    };

    const getPriorityBadge = (priority) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        return priority === 'express' 
            ? `${baseClasses} bg-orange-100 text-orange-800`
            : `${baseClasses} bg-gray-100 text-gray-800`;
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        return status === 'available'
            ? `${baseClasses} bg-green-100 text-green-800`
            : `${baseClasses} bg-yellow-100 text-yellow-800`;
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Assign Agents
                </h1>
                <p className="text-gray-600">
                    Assign available agents to pending bookings
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Unassigned Bookings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <Package className="h-5 w-5 text-orange-600" />
                            <span>Unassigned Bookings</span>
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                            {unassignedBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        selectedBooking?.id === booking.id
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{booking.id}</h3>
                                            <p className="text-sm text-gray-600">{booking.customer}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">{booking.amount}</p>
                                            <span className={getPriorityBadge(booking.priority)}>
                                                {booking.priority}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-green-500" />
                                            <span className="text-gray-600">{booking.pickup}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-red-500" />
                                            <span className="text-gray-600">{booking.delivery}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-500">
                                            <span>{booking.weight}</span>
                                            <span>{booking.distance}</span>
                                            <span>{booking.estimatedTime}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Available Agents */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                <UserPlus className="h-5 w-5 text-blue-600" />
                                <span>Available Agents</span>
                            </h2>
                            {selectedBooking && (
                                <span className="text-sm text-orange-600 font-medium">
                                    Select agent for {selectedBooking.id}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search agents..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Filter className="h-4 w-4 text-gray-400" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="available">Available</option>
                                    <option value="busy">Busy</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                            {filteredAgents.map((agent) => (
                                <div
                                    key={agent.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{agent.name}</h3>
                                                <p className="text-sm text-gray-600">{agent.id}</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                                    <span className="text-sm text-gray-600">{agent.rating}</span>
                                                    <span className="text-sm text-gray-500">({agent.totalDeliveries} deliveries)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={getStatusBadge(agent.status)}>
                                            {agent.status}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-3 w-3" />
                                            <span>{agent.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Activity className="h-3 w-3" />
                                            <span>{agent.vehicle}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Package className="h-3 w-3" />
                                            <span>{agent.capacity}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-3 w-3" />
                                            <span>{agent.workingHours}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-1">
                                            {agent.expertise.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {selectedBooking && agent.status === 'available' && (
                                            <button
                                                onClick={() => handleAssignAgent(selectedBooking.id, agent.id)}
                                                className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                            >
                                                <CheckCircle className="h-3 w-3" />
                                                <span>Assign</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            {!selectedBooking && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        <p className="text-blue-800 font-medium">
                            Select a booking from the left panel to assign an agent
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignAgents;
