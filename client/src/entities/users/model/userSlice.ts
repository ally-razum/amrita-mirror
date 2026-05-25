import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User, UserState } from "./types";

const storageKey = "user";

const loadFromStorage = (): UserState => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const user = JSON.parse(stored);
      return {
        currentUser: user,
        isAuthenticated: true,
      };
    } catch {
      return {
        currentUser: null,
        isAuthenticated: false,
      };
    }
  }
  return {
    currentUser: null,
    isAuthenticated: false,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: loadFromStorage(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem(storageKey);
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;