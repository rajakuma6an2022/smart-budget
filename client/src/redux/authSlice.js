import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
 login: (state, action) => {
  state.isAuthenticated = true;
  state.user = action.payload.user;
  state.token = action.payload.token || state.token;

  if (action.payload.user) {
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  }
  if (action.payload.token) {
    localStorage.setItem("token", action.payload.token);
  }
},
    logoutAcc: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // clear only auth data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    loadUserFromStorage: (state) => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && storedToken) {
      state.isAuthenticated = true;
      state.user = JSON.parse(storedUser);
      state.token = storedToken;
    }
  } catch (err) {
    console.error("Error parsing user from storage:", err);
    localStorage.removeItem("user"); // clear corrupt value
  }

  state.isHydrated = true;
},
  },
});

export const { login, logoutAcc, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
