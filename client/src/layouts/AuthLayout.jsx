// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div className="bg-bg text-text h-screen w-full md:flex md:items-center md:justify-center">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
