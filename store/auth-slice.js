import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    currentUser: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.currentUser = action.payload.currUser;
      if (state.token) {
        state.isLoggedIn = true;
      }
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
