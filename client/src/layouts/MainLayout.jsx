// src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";


const MainLayout = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`${theme === "dark" ? "dark" : ""} `}>
      <div className="h-screen flex flex-col bg-bg text-text">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1 lg:overflow-hidden gap-2">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex-1 p-2 lg:p-4 bg-card text-text shadow-lg rounded-xl flex flex-col scrollbar-none overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
export default MainLayout;
