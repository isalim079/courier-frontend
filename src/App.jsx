import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/shared/Login/Login";
import Register from "./pages/shared/Register/Register";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
