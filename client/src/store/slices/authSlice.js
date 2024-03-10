import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../config/config";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await authService.login(credentials);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await authService.register(userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      });
  },
});

export default authSlice.reducer;
