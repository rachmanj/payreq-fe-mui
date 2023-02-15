import { createSlice } from "@reduxjs/toolkit";
import { getAllApproved, createApproved } from "../actions/approvedAction";

let DEFAULT_APPROVED_STATE = {
  list: [],
  loading: false,
  error: null,
};

const approvedSlice = createSlice({
  name: "approveds",
  initialState: DEFAULT_APPROVED_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET ALL PAYREQS
      .addCase(getAllApproved.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllApproved.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllApproved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //CREATE PAYREQ
      .addCase(createApproved.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createApproved.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.list.unshift(action.payload);
      })
      .addCase(createApproved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default approvedSlice.reducer;
