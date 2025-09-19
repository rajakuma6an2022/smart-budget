// Loader.jsx
import React from "react";

const Loader = ({
  size = 48,
  symbol = "$",
  color = "#DAA520",
  bgColor = "#FFD700",
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50">
      <span
        className="loader"
        style={{
          "--loader-size": `${size}px`,
          "--loader-symbol": `"${symbol}"`,
          "--loader-color": color,
          "--loader-bg": bgColor,
        }}
      ></span>
    </div>
  );
};

export default Loader;
