import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => setDarkMode((prev: boolean) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in.");
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-indigo-900 to-purple-800"
          : "bg-gradient-to-br from-purple-100 via-pink-50 to-white"
      }`}
    >
      {/* Theme Toggle */}
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

      {/* Main Card */}
      <div
        className={`max-w-3xl mx-auto p-8 rounded-xl backdrop-blur-md border transition ${
          darkMode
            ? "bg-white/10 border-white/20 text-white"
            : "bg-black/5 border-black/10 text-black"
        }`}
      >
        {loading ? (
          <p className="text-xl text-center">Loading...</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome, {username} 👋</h1>
            <p className="mb-6">You are successfully authenticated.</p>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <ToastContainer />
    </motion.div>
  );
}
