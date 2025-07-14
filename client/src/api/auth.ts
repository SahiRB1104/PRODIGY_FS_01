// src/api/auth.ts
import axios from "axios";

// ✅ Uses env variable set in Vercel (or .env for local)
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  withCredentials: true, // Optional: if you're using cookies
});

// POST: Register
export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post("/register", data);

// POST: Login
export const loginUser = (data: { email: string; password: string }) =>
  API.post("/login", data);

// GET: Current user (optional, for /me route)
export const getCurrentUser = () => API.get("/me");
