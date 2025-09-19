import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="relative w-12 h-6 flex items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"
    >
      {/* Knob */}
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 24 : 0, // slide left/right
          backgroundColor: isDark ? "#1F2937" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {isDark ? (
          <FaMoon className="text-yellow-400" size={12} />
        ) : (
          <FaSun className="text-yellow-500" size={12} />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
