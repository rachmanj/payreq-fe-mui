import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  clearNotification,
  errorGlobal,
  successGlobal,
} from "../reducers/notificationReducer";
import { removeTokenCookie } from "../../utils/tools";

const PAYREQ_URL = "http://localhost:8000/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(`${PAYREQ_URL}/login`, {
        email,
        password,
      });
      dispatch(
        successGlobal({ message: "Welcome to the jungle Jim", status: "login" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 6000);
      return { data: response.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 6000);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  removeTokenCookie();
});
