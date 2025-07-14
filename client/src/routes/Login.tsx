import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import { loginUser } from "../api/auth";
import GlassCard from "../components/GlassCard";
import FloatingInput from "../components/FloatingInput";
import { useTheme } from "../context/ThemeContext";


export default function Login() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const toggleTheme = () => setDarkMode((prev: boolean) => !prev);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = async () => {
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username); 
      setSuccess(true);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-indigo-900 to-purple-800"
          : "bg-gradient-to-br from-purple-100 via-pink-50 to-white"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full transition ${
          darkMode
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-black/10 text-black hover:bg-black/20"
        }`}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <GlassCard>
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className={`text-5xl font-bold mb-6 text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Secure Login
        </motion.h1>

        <FloatingInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <FloatingInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-xl shadow-md transition"
        >
          Login
        </button>

        <p
          className={`mt-4 text-center text-sm ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="underline  hover:text-white dark:text-black dark:hover:text-blue-300"
          >
            Register
          </button>
        </p>
      </GlassCard>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✅ Login successful! Redirecting to dashboard...
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </motion.div>
  );
}
