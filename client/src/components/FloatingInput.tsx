import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FloatingInput({ label, type, value, onChange, error }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  return (
    <div className="relative mb-6 w-full">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className={`peer w-full px-4 py-3 pr-10 bg-white/90 dark:bg-white/10 text-black dark:text-white border 
                    border-gray-300 dark:border-white/20 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-purple-400 transition placeholder-transparent`}
      />

      <label
        className={`
          absolute left-4 top-3.5 text-base text-gray-400 dark:text-white/70 transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-500 dark:text-white/70"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
