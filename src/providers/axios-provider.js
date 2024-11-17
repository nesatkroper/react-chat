import axios from "axios";
import { apiUrl } from "@/providers/api-url";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
