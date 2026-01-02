import { publicHttp } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchInfo = createAsyncThunk("info/fetchInfo", async () => {
  try {
    const response = await publicHttp.get("/api/get-info");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch info");
  }
});

const infoSlice = createSlice({
  name: "info",
  initialState: {
    info: {},
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = "loading";
        state.info = {};
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = action.payload;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default infoSlice.reducer;
