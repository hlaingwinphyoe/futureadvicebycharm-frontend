import { http, publicHttp } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicHttp.post(`/api/register`, data);
      return response.data;
    } catch (error) {
      // Return the full error response (message and errors)
      return rejectWithValue(
        error.response?.data || { message: "Register failed" }
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicHttp.post(`/api/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const oAuthLogin = createAsyncThunk(
  "/user/oauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicHttp.get(`/api/auth/google/redirect`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await http.post("/api/auth/logout");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/api/auth/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user info"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(register.fulfilled, (state, action) => ({
        ...state,
        status: "succeeded",
        user: action.payload.user,
        error: null,
      }))
      .addCase(register.rejected, (state, action) => ({
        ...state,
        status: "failed",
        user: null,
        error: action.error.message,
      }))
      .addCase(login.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...state,
        status: "succeeded",
        user: action.payload.user,
        error: null,
      }))
      .addCase(login.rejected, (state, action) => ({
        ...state,
        status: "failed",
        user: null,
        error: action.error.message,
      })) // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      // Update user info
      .addCase(updateUserInfo.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.data,
        error: null,
      }))
      .addCase(updateUserInfo.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
      }));
  },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
