import React from "react";

const FormErrorMessage = ({ error, messages = {}, className = "" }) => {
  if (!error) return null;
  return (
    <span
      className={`form-error ${className}`}
      style={{ color: "red", fontSize: "12px" }}
    >
      {messages[error.type] || "Invalid field"}
    </span>
  );
};

export default FormErrorMessage;
