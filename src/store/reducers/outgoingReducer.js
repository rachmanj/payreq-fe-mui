import { createSlice } from "@reduxjs/toolkit";
import {
  getOutgoings,
  todayOutgoing,
  editOutgoing,
} from "../actions/outgoingAction";

let DEFAULT_OUTGOING_STATE = {
  list: [],
  loading: false,
  error: null,
};

const outgoingSlice = createSlice({
  name: "outgoings",
  initialState: DEFAULT_OUTGOING_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET OUTGOING PAYREQS
      .addCase(getOutgoings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOutgoings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getOutgoings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // UPDATE OUTGOING TODAY BUTTON
      .addCase(todayOutgoing.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(todayOutgoing.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (payreq) => payreq.id !== action.payload.id
        );
      })
      .addCase(todayOutgoing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // UPDATE OUTGOING EDIT BUTTON
      .addCase(editOutgoing.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editOutgoing.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (payreq) => payreq.id !== action.payload.id
        );
      })
      .addCase(editOutgoing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default outgoingSlice.reducer;
