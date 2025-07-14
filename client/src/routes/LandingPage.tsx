import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
// import ParticlesBackground from "../components/ParticlesBackground"; ❌ Temporarily disabled
import GlassCard from "../components/GlassCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative flex items-center justify-center min-h-screen px-4 transition-colors duration-500 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-indigo-900 to-purple-800"
          : "bg-gradient-to-br from-purple-100 via-pink-50 to-white"
      }`}
    >
      {/* Particle Layer - Temporarily disabled */}
      {/* <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div> */}

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute z-10 top-4 right-4 p-2 rounded-full ${
          darkMode ? "bg-white/10 text-white" : "bg-black/10 text-black"
        } hover:scale-105 transition`}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Content Layer */}
      <div className="relative z-10">
        <GlassCard>
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className={`text-5xl font-bold mb-6 text-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Welcome to Secure Auth
          </motion.h1>
          <p
            className={`mb-6 text-lg text-center ${
              darkMode ? "text-white/80" : "text-gray-800"
            }`}
          >
            The most secure and stylish way to handle your user authentication with stunning glass UI and dark mode toggle.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
            >
              Register
            </button>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
