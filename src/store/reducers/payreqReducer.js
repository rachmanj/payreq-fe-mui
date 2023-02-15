import { createSlice } from "@reduxjs/toolkit";
import { getAllPayreq } from "../actions/payreqAction";

let DEFAULT_PAYREQ_STATE = {
  paginate: [],
  loading: false,
  error: null,
};

const payreqSlice = createSlice({
  name: "payreqs",
  initialState: DEFAULT_PAYREQ_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET ALL PAYREQS
      .addCase(getAllPayreq.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPayreq.fulfilled, (state, action) => {
        state.loading = false;
        state.paginate = action.payload;
      })
      .addCase(getAllPayreq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default payreqSlice.reducer;
