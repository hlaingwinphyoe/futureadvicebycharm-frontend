import { publicHttp } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchZodiacs = createAsyncThunk(
  "zodiacs/fetchZodiacs",
  async () => {
    try {
      const response = await publicHttp.get("/api/zodiacs-list");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch zodiacs"
      );
    }
  }
);

const zodiacsSlice = createSlice({
  name: "zodiacs",
  initialState: {
    zodiacs: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZodiacs.pending, (state) => {
        state.status = "loading";
        state.zodiacs = [];
      })
      .addCase(fetchZodiacs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.zodiacs = action.payload;
      })
      .addCase(fetchZodiacs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default zodiacsSlice.reducer;
