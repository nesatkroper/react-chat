import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axiosInstance";

export const getStudent = createAsyncThunk("getStudent", async () => {
  const response = await axiosInstance.get("/students");
  return response.data;
});

const studentSlice = createSlice({
  name: "student",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudent.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default studentSlice.reducer;
