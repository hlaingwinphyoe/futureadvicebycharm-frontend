import { http } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: {},
  status: "idle",
  error: null,
};

export const fetchAppointment = createAsyncThunk(
  "appointment/fetchAppointment",
  async (appointmentNo) => {
    try {
      const response = await http.get(
        `/api/auth/appointments/${appointmentNo}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch appointment"
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointment: (state) => {
      state.appointment = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.status = "loading";
        state.appointment = [];
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointment = action.payload;
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
