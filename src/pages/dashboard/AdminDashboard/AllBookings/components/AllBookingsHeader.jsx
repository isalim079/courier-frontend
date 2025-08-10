function AllBookingsHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            All Bookings
          </h1>
          <p className="text-gray-600">
            Manage and track all courier bookings
          </p>
        </div>
      </div>
    </div>
  );
}

export default AllBookingsHeader;
