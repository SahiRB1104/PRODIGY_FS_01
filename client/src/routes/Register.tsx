import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import { registerUser } from "../api/auth";
import GlassCard from "../components/GlassCard";
import FloatingInput from "../components/FloatingInput";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const toggleTheme = () => setDarkMode((prev: boolean) => !prev);

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Please enter a valid email address";
    if (!form.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleRegister = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await registerUser(form);
      setSuccess(true);
      toast.success("🎉 Registered successfully!");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, rotate: -5 }}
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
          Sign Up
        </motion.h1>

        <FloatingInput
          label="Username"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          error={errors.username}
        />
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
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md transition"
        >
          Register
        </button>

        <p
          className={`mt-4 text-center text-sm ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="underline  hover:text-white dark:text-black dark:hover:text-blue-300"
          >
            Login
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
            🎉 Registration successful! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </motion.div>
  );
}
