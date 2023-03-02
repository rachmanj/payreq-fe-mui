import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../actions/authAction";

let DEFAULT_USERS_STATE = {
  loading: false,
  data: {
    id: null,
    name: null,
    email: null,
  },
  auth: null,
};

export const userSlice = createSlice({
  name: "loggedUser",
  initialState: DEFAULT_USERS_STATE,
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
        state.data = DEFAULT_USERS_STATE.data;
        state.auth = DEFAULT_USERS_STATE.auth;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = DEFAULT_USERS_STATE.data;
        state.auth = false;
      });
  },
});

export default userSlice.reducer;
