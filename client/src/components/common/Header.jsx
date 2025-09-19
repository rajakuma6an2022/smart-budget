// src/components/Header.jsx
import React from "react";
import ThemeToggle from "../ThemeToggle";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-card shadow-lg p-2 lg:p-4 flex justify-between items-center mb-2">
      <button
        onClick={onMenuClick}
        className="block lg:hidden p-2 rounded-lg bg-bg hover:bg-primary hover:text-white transition"
      >
        <FaBars size={20} />
      </button>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
        >
          <rect width="120" height="40" rx="8" fill="#2563EB" />

          <circle cx="20" cy="20" r="12" fill="#10B981" />
          <text
            x="16"
            y="25"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            fontFamily="Poppins, sans-serif"
          >
            $
          </text>

          <text
            x="40"
            y="27"
            fontSize="18"
            fontWeight="bold"
            fill="white"
            fontFamily="Poppins, sans-serif"
          >
            Budget
          </text>
        </svg>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* <FaUserCircle size={24} className="text-text" /> */}
      </div>
    </header>
  );
};

export default Header;
