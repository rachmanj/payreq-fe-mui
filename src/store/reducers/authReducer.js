import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../actions/authAction";

let DEFAULT_USER_STATE = {
  loading: false,
  data: {
    id: null,
    name: null,
    email: null,
  },
  auth: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState: DEFAULT_USER_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = action.payload.auth;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = DEFAULT_USER_STATE.data;
        state.auth = false;
      });
  },
});

export default userSlice.reducer;
