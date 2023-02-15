import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getAdvanceCategories = createAsyncThunk(
  "advanceCategories/getAllAdvanceCategories",
  async () => {
    try {
      const response = await axios.get(`${PAYREQ_URL}/adv-category`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
