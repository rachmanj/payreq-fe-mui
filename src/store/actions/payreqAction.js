import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getAllPayreq = createAsyncThunk(
  "payreqs/getAllPayreq",
  async (page) => {
    try {
      const response = await axios.get(`${PAYREQ_URL}/payreqs?page=${page}`);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
