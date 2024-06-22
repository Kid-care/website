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

// Dashboard thunks...

export const fetchUserStatsAsync = createAsyncThunk(
  "dashboard/fetchUserStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.fetchUserStats(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminCountAsync = createAsyncThunk(
  "dashboard/fetchAdminCount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.fetchAdminCount(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserCountAsync = createAsyncThunk(
  "dashboard/fetchUserCount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.fetchUserCount(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllAdminsAsync = createAsyncThunk(
  "dashboard/fetchAllAdmins",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.fetchAllAdmins(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAdminAsync = createAsyncThunk(
  "dashboard/addAdmin",
  async (adminData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.addAdmin(token, adminData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAdminAsync = createAsyncThunk(
  "dashboard/updateAdmin",
  async (adminData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.updateAdmin(token, adminData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdminAsync = createAsyncThunk(
  "dashboard/deleteAdmin",
  async (email, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.deleteAdmin(token, email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVaccinationAsync = createAsyncThunk(
  "vaccination/add",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await authService.addVaccination(id, name);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPhotoAsync = createAsyncThunk(
  "photos/postPhoto",
  async ({ token, photo }, { rejectWithValue }) => {
    try {
      const response = await authService.postPhoto(token, photo);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPhotosAsync = createAsyncThunk(
  "photos/getPhotos",
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.getPhotos(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPhotosAdminAsync = createAsyncThunk(
  "photos/getPhotosAdmin",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await authService.getPhotosAdmin(token, id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isAdmin: false,
    user: {},
    admins: [],
    userCount: 0,
    adminCount: 0,
    ageGroups: {},
    loading: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = {};
      state.admins = [];
      state.photos = [];

      state.userCount = 0;
      state.adminCount = 0;
      state.ageGroups = {};
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
        if (action.payload.user.roles === "admin") {
          state.isAdmin = true;
          state.token = action.payload.user.token;

        }
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
      })

      .addCase(fetchUserStatsAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUserStatsAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.ageGroups = action.payload.ageGroups;

        console.log(action.payload);

        // Handle the fulfilled action here
      })
      .addCase(fetchUserStatsAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(fetchAdminCountAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAdminCountAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.adminCount = action.payload.num;
        console.log(action.payload);

        // Handle the fulfilled action here
      })
      .addCase(fetchAdminCountAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(fetchUserCountAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUserCountAsync.fulfilled, (state, action) => {
        state.userCount = action.payload.num;

        state.loading = "idle";
        console.log(action.payload);

        // Handle the fulfilled action here
      })
      .addCase(fetchUserCountAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(fetchAllAdminsAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAllAdminsAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.admins = action.payload;

        // Handle the fulfilled action here
      })
      .addCase(fetchAllAdminsAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(addAdminAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addAdminAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.admins = action.payload;

        // Handle the fulfilled action here
      })
      .addCase(addAdminAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(updateAdminAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateAdminAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
      })
      .addCase(updateAdminAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(deleteAdminAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteAdminAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.admins = action.payload;

        // Handle the fulfilled action here
      })
      .addCase(deleteAdminAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(addVaccinationAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addVaccinationAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        console.log(action.payload);
      })
      .addCase(addVaccinationAsync.rejected, (state, action) => {
        state.loading = "idle";
        if (action.error) {
          state.error = action.error.message || "An error occurred";
        } else {
          state.error = "An error occurred";
        }
      })

      .addCase(postPhotoAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(postPhotoAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.photos = action.payload.photos;
      })
      .addCase(postPhotoAsync.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "An error occurred";
      })

      .addCase(getPhotosAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.photos = action.payload.photos;
      })
      .addCase(getPhotosAsync.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "An error occurred";
      })

      .addCase(getPhotosAdminAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getPhotosAdminAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.photos = action.payload;
      })
      .addCase(getPhotosAdminAsync.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
