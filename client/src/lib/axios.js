import axios from "axios";

export const axiosInstance = axios.create({ 
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true, 
})

axiosInstance.interceptors.request.use((config) => {
  // Get token before every request
  const token = localStorage.getItem("token");
  // console.log("Interceptor Token:", token); // For debugging

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});