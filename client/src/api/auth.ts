import axios from "axios";
console.log("🔍 Base URL →", import.meta.env.VITE_API_BASE_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Let Vercel handle rewriting to Render
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post("/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/login", data);

export const getCurrentUser = () => API.get("/me");
// Removed Express route handler as this file is for client-side API calls.

