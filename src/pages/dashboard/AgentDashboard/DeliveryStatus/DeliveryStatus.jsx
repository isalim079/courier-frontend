import { useState } from 'react';
import { 
    Package, 
    CheckCircle, 
    Clock, 
    AlertTriangle,
    MapPin,
    User,
    Phone,
    Upload,
    Camera,
    FileText,
    Save
} from 'lucide-react';

function DeliveryStatus() {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState('');
    const [notes, setNotes] = useState('');
    const [proofFile, setProofFile] = useState(null);

    const pendingParcels = [
        {
            id: 'PKG001',
            trackingNumber: 'CPMS2025001',
            customerName: 'John Smith',
            customerPhone: '+1 (555) 123-4567',
            deliveryAddress: '456 Home Ave, Suburb',
            currentStatus: 'picked_up',
            priority: 'high',
            estimatedDelivery: '2025-08-09 02:00 PM'
        },
        {
            id: 'PKG002',
            trackingNumber: 'CPMS2025002',
            customerName: 'Sarah Johnson',
            customerPhone: '+1 (555) 987-6543',
            deliveryAddress: '321 Residential Blvd, Uptown',
            currentStatus: 'in_transit',
            priority: 'normal',
            estimatedDelivery: '2025-08-09 01:30 PM'
        },
        {
            id: 'PKG003',
            trackingNumber: 'CPMS2025003',
            customerName: 'Michael Brown',
            customerPhone: '+1 (555) 456-7890',
            deliveryAddress: '888 Office Plaza, Business District',
            currentStatus: 'out_for_delivery',
            priority: 'urgent',
            estimatedDelivery: '2025-08-09 12:00 PM'
        }
    ];

    const statusOptions = [
        { value: 'picked_up', label: 'Picked Up', color: 'bg-yellow-500', icon: Package },
        { value: 'in_transit', label: 'In Transit', color: 'bg-blue-500', icon: Clock },
        { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-purple-500', icon: MapPin },
        { value: 'delivered', label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
        { value: 'failed_delivery', label: 'Failed Delivery', color: 'bg-red-500', icon: AlertTriangle },
        { value: 'returned', label: 'Returned to Sender', color: 'bg-gray-500', icon: Package }
    ];

    const getCurrentStatusColor = (status) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption ? statusOption.color : 'bg-gray-500';
    };

    const handleStatusUpdate = (parcel) => {
        setSelectedParcel(parcel);
        setStatusUpdate(parcel.currentStatus);
        setNotes('');
        setProofFile(null);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setProofFile(file);
    };

    const submitStatusUpdate = () => {
        // Here you would send the update to the backend
        console.log('Status Update:', {
            parcelId: selectedParcel.id,
            newStatus: statusUpdate,
            notes: notes,
            proofFile: proofFile,
            timestamp: new Date().toISOString()
        });
        
        // Reset form
        setSelectedParcel(null);
        setStatusUpdate('');
        setNotes('');
        setProofFile(null);
        
        alert('Status updated successfully!');
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Update Delivery Status
                </h1>
                <p className="text-gray-600">
                    Update the status of your assigned deliveries in real-time
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Parcels List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Parcels Requiring Status Update
                    </h2>
                    
                    {pendingParcels.map((parcel) => (
                        <div key={parcel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${
                                        parcel.priority === 'urgent' ? 'bg-red-500' :
                                        parcel.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                                    }`}></div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{parcel.trackingNumber}</h3>
                                        <p className="text-sm text-gray-600">ID: {parcel.id}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCurrentStatusColor(parcel.currentStatus)}`}>
                                    {parcel.currentStatus.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center space-x-2 text-sm">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span>{parcel.customerName}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{parcel.customerPhone}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{parcel.deliveryAddress}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>ETA: {parcel.estimatedDelivery}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleStatusUpdate(parcel)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Update Status
                            </button>
                        </div>
                    ))}
                </div>

                {/* Status Update Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {selectedParcel ? (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Update Status: {selectedParcel.trackingNumber}
                            </h2>

                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Delivery Details</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><strong>Customer:</strong> {selectedParcel.customerName}</p>
                                    <p><strong>Phone:</strong> {selectedParcel.customerPhone}</p>
                                    <p><strong>Address:</strong> {selectedParcel.deliveryAddress}</p>
                                </div>
                            </div>

                            {/* Status Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    New Status
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {statusOptions.map((option) => {
                                        const IconComponent = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setStatusUpdate(option.value)}
                                                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                                                    statusUpdate === option.value
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className={`p-1 rounded ${option.color} text-white`}>
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium">{option.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add any additional notes about the delivery..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Proof of Delivery */}
                            {(statusUpdate === 'delivered' || statusUpdate === 'failed_delivery') && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Proof of Delivery
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="proof-upload"
                                        />
                                        <label htmlFor="proof-upload" className="cursor-pointer">
                                            {proofFile ? (
                                                <div className="space-y-2">
                                                    <FileText className="h-8 w-8 text-green-500 mx-auto" />
                                                    <p className="text-sm font-medium text-green-700">
                                                        {proofFile.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Click to change</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Camera className="h-8 w-8 text-gray-400 mx-auto" />
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Upload Photo/Signature
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Click to take photo or select file
                                                    </p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={submitStatusUpdate}
                                    disabled={!statusUpdate}
                                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    <span>Update Status</span>
                                </button>
                                <button
                                    onClick={() => setSelectedParcel(null)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Select a Parcel to Update
                            </h3>
                            <p className="text-gray-600">
                                Choose a parcel from the list to update its delivery status
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeliveryStatus;
