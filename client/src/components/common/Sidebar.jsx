import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaTimes,
  FaSignOutAlt,
  FaMoneyBillWave,
  FaReceipt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutAcc } from "../../redux/authSlice";
import useLogout from "../../utils/logout";

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useLogout();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/income", label: "Income", icon: <FaMoneyBillWave /> },
    { to: "/expense", label: "Expense", icon: <FaReceipt /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full sm:h-auto w-64 bg-card text-text rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50 transform transition-transform
        ${isOpen ? "block" : "hidden"} lg:block
      `}
    >
      <div className="block lg:hidden">
        <div className="flex justify-between items-center">
          {/* Logo */}
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
          <button
            onClick={onClose}
            className="lg:hidden self-end mb-4 p-2 rounded-lg hover:bg-bg"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 text-sm lg:text-base rounded-xl transition-colors 
           ${isActive ? "bg-primary text-white" : "hover:bg-bg text-text"}`
          }
          onClick={onClose}
        >
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
      <hr />
      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center font-semibold gap-3 text-sm lg:text-base p-3 rounded-xl transition-colors hover:bg-bg text-text"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
