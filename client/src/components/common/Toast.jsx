// src/components/common/Toast.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = {
  success: (message, options = {}) => toast.success(message, options),
  error: (message, options = {}) => toast.error(message, options),
  info: (message, options = {}) => toast.info(message, options),
  warn: (message, options = {}) => toast.warn(message, options),
};

export const ToastProvider = () => {
  const [position, setPosition] = useState("top-right");

  // Update position on screen resize
  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 640) {
        // small screens (mobile)
        setPosition("bottom-center");
      } else {
        // tablets/desktop
        setPosition("top-right");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <ToastContainer
      position={position}
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      // draggable
      // pauseOnHover
      theme="colored"
      limit={3} // prevent too many stacking on small screens
      style={{
        width: "100%", // makes toasts fit on small screens
        maxWidth: "400px",
        margin: "0 auto",
      }}
    />
  );
};
