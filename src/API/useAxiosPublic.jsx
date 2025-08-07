import axios from "axios";

// http://localhost:3003

const axiosPublic = axios.create({
  baseURL: "http://localhost:3003/api/v1",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
