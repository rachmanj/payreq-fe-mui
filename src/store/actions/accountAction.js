import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    try {
      const response = await axios.get(`${PAYREQ_URL}/accounts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
