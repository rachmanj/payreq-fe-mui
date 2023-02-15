import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/usersAction";

let DEFAULT_USERS_STATE = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USERS_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //FECTH USERS
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
