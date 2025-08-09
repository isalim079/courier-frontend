import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/shared/Login/Login";
import Register from "./pages/shared/Register/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/dashboard/AdminDashboard/Dashboard";
import DashboardHome from "./pages/dashboard/AdminDashboard/DashboardHome/DashboardHome";
import AllBookings from "./pages/dashboard/AdminDashboard/AllBookings/AllBookings";
import AssignAgents from "./pages/dashboard/AdminDashboard/AssignAgents/AssignAgents";
import AllUsers from "./pages/dashboard/AdminDashboard/AllUsers/AllUsers";
import Reports from "./pages/dashboard/AdminDashboard/Reports/Reports";
import AgentDashboard from "./pages/dashboard/AgentDashboard/AgentDashboard";
import AgentDashboardHome from "./pages/dashboard/AgentDashboard/AgentDashboardHome/AgentDashboardHome";
import AssignedParcels from "./pages/dashboard/AgentDashboard/AssignedParcels/AssignedParcels";
import DeliveryStatus from "./pages/dashboard/AgentDashboard/DeliveryStatus/DeliveryStatus";
import RouteMap from "./pages/dashboard/AgentDashboard/RouteMap/RouteMap";
import DeliveryHistory from "./pages/dashboard/AgentDashboard/DeliveryHistory/DeliveryHistory";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard/CustomerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin.dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="bookings" element={<AllBookings />} />
        <Route path="assign-agents" element={<AssignAgents />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route
        path="/agent.dashboard"
        element={
          <PrivateRoute>
            <AgentDashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<AgentDashboardHome />} />
        <Route path="assigned-parcels" element={<AssignedParcels />} />
        <Route path="delivery-status" element={<DeliveryStatus />} />
        <Route path="route-map" element={<RouteMap />} />
        <Route path="delivery-history" element={<DeliveryHistory />} />
      </Route>

      <Route
        path="/customer.dashboard"
        element={
          <PrivateRoute>
            <CustomerDashboard />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
