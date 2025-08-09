import { useAuth } from "../../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function Dashboard() {
  const { user } = useAuth();
  console.log(user.role);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
