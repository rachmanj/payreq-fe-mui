import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getAllApproved = createAsyncThunk(
  "approveds/getAllApproved",
  async (page) => {
    try {
      const response = await axios.get(`${PAYREQ_URL}/approved?page=${page}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

//CREATE PAYREQ
export const createApproved = createAsyncThunk(
  "approveds/createApproved",
  async (approved) => {
    try {
      const response = await axios.post(`${PAYREQ_URL}/approved`, approved);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
