import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    global: {},
  },
  reducers: {
    errorGlobal: (state, action) => {
      state.global.error = true;
      state.global.message = action.payload;
    },
    successGlobal: (state, action) => {
      state.global.success = true;
      state.global.status = action.payload.status;
      state.global.message = action.payload.message;
    },
    clearNotification: (state) => {
      state.global = {};
    },
  },
});

export const { errorGlobal, successGlobal, clearNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
