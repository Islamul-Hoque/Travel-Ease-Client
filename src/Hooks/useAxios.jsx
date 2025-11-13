import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travel-ease-lemon.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
