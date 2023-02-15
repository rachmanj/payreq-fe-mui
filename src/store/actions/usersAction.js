import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
