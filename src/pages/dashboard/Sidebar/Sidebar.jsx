import { useState } from 'react';
import { 
    LayoutDashboard, 
    Package, 
    Users, 
    UserCheck, 
    BarChart3, 
    LogOut,
    Truck,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

function Sidebar() {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            id: 'bookings',
            label: 'All Bookings',
            icon: Package,
            path: '/dashboard/bookings'
        },
        {
            id: 'assign-agents',
            label: 'Assign Agents',
            icon: UserCheck,
            path: '/dashboard/assign-agents'
        },
        {
            id: 'users',
            label: 'All Users',
            icon: Users,
            path: '/dashboard/users'
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: BarChart3,
            path: '/dashboard/reports'
        }
    ];

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        // Add navigation logic here
        console.log(`Navigating to: ${itemId}`);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
    };

    return (
        <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
            isCollapsed ? 'w-16' : 'min-w-[280px]'
        }`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <Truck className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-orange-600">CPMS</span>
                        </div>
                    )}
                    
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                        ) : (
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className={`flex-1 ${isCollapsed ? 'flex justify-center pt-10' : 'p-4'}`}>
                <ul className={`${isCollapsed ? 'space-y-3' : 'space-y-2'}`}>
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeItem === item.id;
                        
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={`w-full flex items-center space-x-3 ${isCollapsed ? 'p-2' : 'px-3 py-3'} rounded-lg transition-all duration-200 group ${
                                        isActive
                                            ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <IconComponent 
                                        className={`h-5 w-5  ${
                                            isActive ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'
                                        }`} 
                                    />
                                    {!isCollapsed && (
                                        <span className="font-medium">{item.label}</span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className={`${isCollapsed ? '' : 'p-4'} border-t border-gray-200`}>
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 px-3 py-3  rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group ${isCollapsed ? 'flex justify-center items-center' : ''}`}
                    title={isCollapsed ? 'Logout' : ''}
                >
                    <LogOut className="h-5 w-5" />
                    {!isCollapsed && (
                        <span className="font-medium">Logout</span>
                    )}
                </button>
            </div>

            {/* User Info (when not collapsed) */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">admin@cpms.com</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;