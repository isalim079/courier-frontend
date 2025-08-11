import axios from "axios";

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003/api/v1";

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
