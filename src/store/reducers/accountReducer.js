import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../actions/accountAction";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
