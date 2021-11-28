import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    checkedItems: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addTask(state, action) {
      state.items.push(action.payload);
    },
    deleteTask(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCheckedItems(state, action) {
      state.checkedItems = action.payload.filter(
        (task) => task.checked === true
      );
    },
  },
});
export const tasksActions = tasksSlice.actions;

export default tasksSlice;
