import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import approvedReducer from "./reducers/approvedReducer";
import outgoingReducer from "./reducers/outgoingReducer";
import employeeReducer from "./reducers/employeeReducer";
import payreqReducer from "./reducers/payreqReducer";
import advanceCategoryReducer from "./reducers/advanceCategoryReducer";
import rabReducers from "./reducers/rabReducers";
import accountReducer from "./reducers/accountReducer";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    approveds: approvedReducer,
    outgoings: outgoingReducer,
    employees: employeeReducer,
    payreqs: payreqReducer,
    advanceCategories: advanceCategoryReducer,
    rabs: rabReducers,
    accounts: accountReducer,
  },
});
