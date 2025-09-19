// src/routes.js
import { lazy } from "react";

const modules = import.meta.glob("../pages/**/*.jsx");

const createLazyComponent = (path) =>
  lazy(modules[`../pages/${path}`]);

export const authRoutes = [
  { path: "/", element: createLazyComponent("AuthPage.jsx") },
];

export const mainRoutes = [
  { path: "/dashboard", element: createLazyComponent("Dashboard.jsx") },
  { path: "/income", element: createLazyComponent("Income.jsx") },
  { path: "/expense", element: createLazyComponent("Expense.jsx") },
  { path: "/settings", element: createLazyComponent("Settings.jsx") },
];

export const fallbackRoute = {
  path: "*",
  element: createLazyComponent("NotFound.jsx"),
};
