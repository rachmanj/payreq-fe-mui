import { createSlice } from "@reduxjs/toolkit";

import { getAdvanceCategories } from "../actions/advanceCategoryAction";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const advanceCategorySlice = createSlice({
  name: "advanceCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdvanceCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAdvanceCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getAdvanceCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default advanceCategorySlice.reducer;
