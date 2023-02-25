import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAYREQ_URL = "http://localhost:8000/api";

export const getOutgoings = createAsyncThunk(
  "outgoings/getOutgoing",
  async () => {
    try {
      const response = await axios.get(`${PAYREQ_URL}/outgoings`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// UPDATE OUTGOING PAYREQ TO TODAY
export const todayOutgoing = createAsyncThunk(
  "outgoings/todayOutgoing",
  async (payreqId) => {
    try {
      const response = await axios.put(`${PAYREQ_URL}/payreqs/${payreqId}`, {
        outgoing_date: new Date().toISOString().slice(0, 10),
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// UPDATE OUTGOING PAYREQ EDIT
export const editOutgoing = createAsyncThunk(
  "outgoings/editOutgoing",
  async ({ payreqId, values }) => {
    try {
      const response = await axios.put(`${PAYREQ_URL}/payreqs/${payreqId}`, {
        values,
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
