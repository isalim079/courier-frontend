function SummaryStats({ bookings, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    { 
      label: "Total Bookings", 
      value: bookings?.length || 0, 
      color: "bg-blue-100 text-blue-800" 
    },
    { 
      label: "Delivered", 
      value: bookings?.filter(b => b.status === "Delivered").length || 0, 
      color: "bg-green-100 text-green-800" 
    },
    { 
      label: "In Transit", 
      value: bookings?.filter(b => b.status === "In Transit").length || 0, 
      color: "bg-yellow-100 text-yellow-800" 
    },
    { 
      label: "Total COD Amount", 
      value: `$${bookings?.reduce((sum, b) => sum + (b.payment?.codAmount || 0), 0).toFixed(2) || '0.00'}`, 
      color: "bg-purple-100 text-purple-800" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
              {stat.label.split(' ')[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryStats;
