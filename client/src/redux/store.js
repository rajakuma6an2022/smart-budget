import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import { authApi } from "./api-services/authApi";
import { userApi } from "./api-services/userApi";
import { incomeApi } from "./api-services/incomeApi";
import { expenseApi } from "./api-services/expenseApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(incomeApi.middleware)
      .concat(expenseApi.middleware),
});
