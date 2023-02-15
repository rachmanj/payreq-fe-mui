import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getRabs = createAsyncThunk("rabs/getRabs", async () => {
  try {
    const response = await axios.get(`${PAYREQ_URL}/rabs`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
