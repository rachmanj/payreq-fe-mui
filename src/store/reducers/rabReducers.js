import { createSlice } from "@reduxjs/toolkit";
import { getRabs } from "../actions/rabAction";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const rabsSlice = createSlice({
  name: "rabs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRabs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRabs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getRabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rabsSlice.reducer;
