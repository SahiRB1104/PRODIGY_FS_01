// src/api/auth.ts
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json", // Required
  },
  withCredentials: false, // Set to true only if you use cookies for auth
});

// POST: Register
export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post("/register", data);

// POST: Login
export const loginUser = (data: { email: string; password: string }) =>
  API.post("/login", data);

// (Optional) GET current user if you build a protected route
export const getCurrentUser = () => API.get("/me");
