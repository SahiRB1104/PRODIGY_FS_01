import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth", // ✅ Let Vercel handle rewriting to Render
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
