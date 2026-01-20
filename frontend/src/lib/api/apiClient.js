import axios from "axios";
import useAuthStore from "../store/AuthStore";


const BASE_URL = "https://finance-tracker-fullstack.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor to add the Authorization header

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api