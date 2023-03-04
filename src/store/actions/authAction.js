import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  clearNotification,
  errorGlobal,
  successGlobal,
} from "../reducers/notificationReducer";
import {
  removeTokenCookie,
  setTokenCookie,
  getAuthHeader,
} from "../../utils/tools";

const PAYREQ_URL = "http://localhost:8000/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(`${PAYREQ_URL}/login`, {
        email,
        password,
      });
      console.log("action", response.data.authorisation.token);
      setTokenCookie(response.data.authorisation.token);
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
export const isAuth = createAsyncThunk("auth/isAuth", async () => {
  try {
    const response = await axios.get(`${PAYREQ_URL}/isauth`, getAuthHeader());
    console.log("isAuth", response.data);
    return { data: response.data.user, auth: true };
  } catch (error) {
    return { data: {}, auth: false };
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  removeTokenCookie();
});
