import { BarChart3 } from 'lucide-react';

function BookingsChart({ bookings, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Recent Bookings</span>
          </h3>
        </div>
        <div className="p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group bookings by status for the chart
  const statusCounts = bookings?.reduce((acc, booking) => {
    const status = booking.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {}) || {};

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
    percentage: bookings?.length ? (count / bookings.length) * 100 : 0
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Bookings by Status</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {statusData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900 w-20">{item.status}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{item.count}</p>
                <p className="text-sm text-gray-500">{item.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
        {statusData.length === 0 && (
          <p className="text-center text-gray-500 py-8">No bookings data available</p>
        )}
      </div>
    </div>
  );
}

export default BookingsChart;
