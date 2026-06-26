import axios from "axios";

// Deployment ke liye ise env variable bana sakte hain, abhi default backup backend URL rakha hai
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://clixora-backend-eyob.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Automatically inject token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Auth page se save kiya hua token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;