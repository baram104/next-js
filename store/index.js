import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import tasksSlice from "./tasks-slice";

export const store = configureStore({
  reducer: { tasks: tasksSlice.reducer, auth: authSlice.reducer },
});
