import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "../reducers/notificationReducer";
import { removeTokenCookie } from "../../utils/tools";

const PAYREQ_URL = "http://localhost:8000/api";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(`${PAYREQ_URL}/login`, {
        email,
        password,
      });
      dispatch(successGlobal("Welcome to the jungle Jim"));
      console.log("action_user", response.data);
      return { data: response.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  removeTokenCookie();
});
