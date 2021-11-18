import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addTask(state, action) {
      state.items.push(action.payload);
    },
  },
});
export const tasksActions = tasksSlice.actions;

export default tasksSlice;
