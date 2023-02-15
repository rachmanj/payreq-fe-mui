import { createSlice } from "@reduxjs/toolkit";
import { getAllEmployees } from "../actions/employeeAction";

const DEFAULT_EMPLOYEE_STATE = {
  list: [],
  status: "idle",
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: DEFAULT_EMPLOYEE_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
