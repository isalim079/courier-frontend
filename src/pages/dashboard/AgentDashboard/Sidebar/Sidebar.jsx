import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { menuItems } from "./SidebarData";
import { useAuth } from "../../../../hooks/useAuth";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get active item from current path
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/agent.dashboard") return "dashboard";
    if (path.includes("/assigned-parcels")) return "assigned-parcels";
    if (path.includes("/route-map")) return "route-map";
    if (path.includes("/delivery-history")) return "delivery-history";
    return "dashboard";
  };

  const activeItem = getActiveItem();

  const handleItemClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col sticky top-0 ${
        isCollapsed ? "w-16" : "min-w-[280px]"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">
                CPMS Agent
              </span>
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
      <nav
        className={`flex-1 ${
          isCollapsed ? "flex justify-center pt-10" : "p-4"
        }`}
      >
        <ul className={`${isCollapsed ? "space-y-3" : "space-y-2"}`}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center space-x-3 ${
                    isCollapsed ? "p-2" : "px-3 py-3"
                  } rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  title={isCollapsed ? item.label : ""}
                >
                  <IconComponent
                    className={`h-5 w-5  ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-gray-700"
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
      <div className={`${isCollapsed ? "" : "p-4"} border-t border-gray-200`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-3 py-3  rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group cursor-pointer ${
            isCollapsed ? "flex justify-center items-center" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* User Info (when not collapsed) */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "Agent"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "agent@cpms.com"}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                Delivery Agent
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
