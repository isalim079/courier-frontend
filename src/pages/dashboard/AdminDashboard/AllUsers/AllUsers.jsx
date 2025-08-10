import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../API/useAxiosPublic';
import Loading from '../../../../components/ui/Loading';

// Components
import AllUsersHeader from './components/AllUsersHeader';
import AllUsersFilters from './components/AllUsersFilters';
import AllUsersGrid from './components/AllUsersGrid';
import AllUsersEmptyState from './components/AllUsersEmptyState';

function AllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const api = useAxiosPublic();

    // Fetch users data
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/auth/all-users');
            
            if (response.data.success === true) {
                setAllUsers(response.data.data?.totalUsers?.users || []);
            } else {
                toast.error('Failed to load users data');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            toast.error('Failed to load users data');
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filter users based on search, role, and status
    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.id?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        
        return matchesSearch && matchesRole;
    });

    // Handle delete user with SweetAlert2 confirmation
    const handleDeleteUser = async (userId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const response = await api.delete(`/auth/delete-user/${userId}`);
                
                if (response.status === 200) {
                    toast.success('User deleted successfully');
                    await fetchUsers(); // Refresh the users list
                    
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    );
                } else {
                    toast.error('Failed to delete user');
                }
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            toast.error('Failed to delete user');
            
            Swal.fire(
                'Error!',
                'Failed to delete the user.',
                'error'
            );
        }
    };

    // Calculate stats
    const stats = {
        totalUsers: allUsers.length,
        totalAdmins: allUsers.filter(user => user.role === 'admin').length,
        totalCustomers: allUsers.filter(user => user.role === 'customer').length,
        totalAgents: allUsers.filter(user => user.role === 'agent').length,
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <AllUsersHeader 
                totalUsers={stats.totalUsers}
                totalAdmins={stats.totalAdmins}
                totalCustomers={stats.totalCustomers}
                totalAgents={stats.totalAgents}
            />

            <AllUsersFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterRole={filterRole}
                setFilterRole={setFilterRole}
            />

            {filteredUsers.length === 0 ? (
                <AllUsersEmptyState />
            ) : (
                <AllUsersGrid 
                    users={filteredUsers}
                    onDeleteUser={handleDeleteUser}
                />
            )}
        </div>
    );
}

export default AllUsers;
