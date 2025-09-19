// src/App.jsx
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { authRoutes, mainRoutes, fallbackRoute } from "./routes/routes";
import Loader from "./components/common/Loader";
import { ToastProvider } from "./components/common/Toast";
import ProtectedRoute from "./routes/ProductedRoute";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <Router>
      <Suspense
        fallback={
          <Loader size={60} symbol="₹" color="#333" bgColor="#f2a900" />
        }
      >
        <Routes>
          <Route element={<AuthLayout />}>
            {authRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route
              path={fallbackRoute.path}
              element={<fallbackRoute.element />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {mainRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route
              path={fallbackRoute.path}
              element={<fallbackRoute.element />}
            />
          </Route>
        </Routes>
        <ToastProvider />
      </Suspense>
    </Router>
  );
}

export default App;
