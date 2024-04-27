// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../config/config";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(token, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendDataToBackendAsync = createAsyncThunk(
  "auth/sendDataToBackend",
  async ({ token, data }) => {
    try {
      const response = await authService.sendDataFromBrofileToBackend(
        token,
        data
      );
      return response.user;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getDataFromBackendAsync = createAsyncThunk(
  "auth/getDataFromBackend",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const user = getState().auth.user;

      const response = await authService.getDataFromBackendToBrofile(
        token,
        user
      );

      return response.user;
    } catch (error) {
      throw error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    user: {},
    loading: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = {};
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
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
        console.log(action.payload);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(sendDataToBackendAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(sendDataToBackendAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
      })
      .addCase(sendDataToBackendAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(getDataFromBackendAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getDataFromBackendAsync.fulfilled, (state, action) => {
        state.user = action.payload;

        state.loading = "idle";
      })
      .addCase(getDataFromBackendAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
