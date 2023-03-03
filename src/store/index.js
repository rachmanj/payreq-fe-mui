import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import approvedReducer from "./reducers/approvedReducer";
import outgoingReducer from "./reducers/outgoingReducer";
import employeeReducer from "./reducers/employeeReducer";
import payreqReducer from "./reducers/payreqReducer";
import advanceCategoryReducer from "./reducers/advanceCategoryReducer";
import rabReducers from "./reducers/rabReducers";
import accountReducer from "./reducers/accountReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    approveds: approvedReducer,
    outgoings: outgoingReducer,
    employees: employeeReducer,
    payreqs: payreqReducer,
    advanceCategories: advanceCategoryReducer,
    rabs: rabReducers,
    accounts: accountReducer,
    notifications: notificationReducer,
  },
});
