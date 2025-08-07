/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import useAxiosPublic from "../API/useAxiosPublic";
import { AuthContext } from "../hooks/useAuth";

const AuthProvider = ({ children }) => {
  const api = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/getMe");
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const logout = async (navigate) => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const value = {
    user,
    loading,
    logout,
    setUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
