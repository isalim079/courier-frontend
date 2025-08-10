import { User } from 'lucide-react';

function AllUsersEmptyState() {
  return (
    <div className="text-center py-12">
      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">No users found</p>
      <p className="text-gray-400">Try adjusting your search or filter criteria</p>
    </div>
  );
}

export default AllUsersEmptyState;
