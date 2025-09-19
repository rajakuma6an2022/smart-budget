import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token, isHydrated } = useSelector(
    (state) => state.auth
  );
  if (!isHydrated) {
    return <div><Loader/></div>; 
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
