import { Navigate } from "react-router-dom";

import Loading from "../components/ui/Loading";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
