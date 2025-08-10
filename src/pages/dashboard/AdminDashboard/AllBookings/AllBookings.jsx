import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../API/useAxiosPublic';
import Loading from '../../../../components/ui/Loading';

// Components
import AllBookingsHeader from './components/AllBookingsHeader';
import AllBookingsFilters from './components/AllBookingsFilters';
import AllBookingsTable from './components/AllBookingsTable';
import AllBookingsPagination from './components/AllBookingsPagination';
import AssignAgentModal from './components/AssignAgentModal';

function AllBookings() {
  const api = useAxiosPublic();
  
  // State
  const [bookings, setBookings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [itemsPerPage] = useState(10);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Fetch bookings data
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/parcel/all-bookings');
      if (response.data.success === true) {
        setBookings(response?.data?.data?.parcels || []);
      } else {
        toast.error('Failed to load bookings data');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error('Failed to load bookings data');
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Fetch agents data
  const fetchAgents = useCallback(async () => {
    try {
      const response = await api.get('/auth/all-users');
      if (response.data.success === true) {
 
        setAgents(response.data.data?.totalAgents?.users);
      } else {
        toast.error('Failed to load agents data');
      }
    } catch (err) {
      console.error('Error fetching agents:', err);
      toast.error('Failed to load agents data');
    }
  }, [api]);

  useEffect(() => {
    fetchBookings();
    fetchAgents();
  }, [fetchBookings, fetchAgents]);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.senderInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.receiverInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.senderInfo?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.receiverInfo?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.senderInfo?.address1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.receiverInfo?.address1?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      booking.status?.toLowerCase().includes(filterStatus.toLowerCase()) ||
      (filterStatus === 'in-transit' && booking.status?.toLowerCase().includes('in transit'));
    
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Handle assign agent
  const handleUpdateAgent = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  // Handle assign agent API call
  const handleAssignAgent = async (parcelId, agentId) => {
    try {
      setAssignLoading(true);
      
      console.log('Assigning agent:', { parcelId, agentId });
      
      const response = await api.put(`/parcel/assign-agent/${parcelId}`, {
        agentId: agentId
      });

      if (response.status === 200) {
        toast.success('Agent assigned successfully!');
        setIsModalOpen(false);
        setSelectedParcel(null);
        // Refresh bookings data
        fetchBookings();
      } else {
        toast.error('Failed to assign agent');
      }
    } catch (err) {
      console.error('Error assigning agent:', err);
      toast.error('Failed to assign agent');
    } finally {
      setAssignLoading(false);
    }
  };

  // Handle delete booking with confirmation
  const handleDeleteBooking = async (parcelId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        const response = await api.delete(`/parcel/delete/${parcelId}`);
        
        if (response.status === 200) {
          toast.success('Booking deleted successfully!');
          // Refresh bookings data
          fetchBookings();
          
          Swal.fire(
            'Deleted!',
            'The booking has been deleted.',
            'success'
          );
        } else {
          toast.error('Failed to delete booking');
        }
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast.error('Failed to delete booking');
      
      Swal.fire(
        'Error!',
        'Failed to delete the booking.',
        'error'
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <AllBookingsHeader />
      
      <AllBookingsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <AllBookingsTable
        bookings={currentBookings}
        onUpdateAgent={handleUpdateAgent}
        onDeleteBooking={handleDeleteBooking}
      />

      <AllBookingsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredBookings.length}
        onPageChange={setCurrentPage}
      />

      <AssignAgentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedParcel(null);
        }}
        parcel={selectedParcel}
        agents={agents}
        onAssignAgent={handleAssignAgent}
        loading={assignLoading}
      />
    </div>
  );
}

export default AllBookings;
