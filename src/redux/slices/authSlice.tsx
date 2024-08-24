import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiServiceInstance from "../../services/Api";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

// Async Thunks for Agent
export const registerAgent = createAsyncThunk(
  "auth/registerAgent",
  async (
    agentData: {
      name: string;
      email: string;
      password: string;
      number: string;
      licenseNumber: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await apiServiceInstance.registerAgent(agentData);
      apiServiceInstance.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginAgent = createAsyncThunk(
  "auth/loginAgent",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await apiServiceInstance.loginAgent(credentials);
      apiServiceInstance.setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.token));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async Thunks for Client
export const registerClient = createAsyncThunk(
  "auth/registerClient",
  async (
    clientData: {
      name: string;
      email: string;
      password: string;
      number: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await apiServiceInstance.registerClient(clientData);
      apiServiceInstance.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginClient = createAsyncThunk(
  "auth/loginClient",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await apiServiceInstance.loginClient(credentials);
      apiServiceInstance.setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.token));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async Thunks for fetching user details
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await apiServiceInstance.getUser();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      apiServiceInstance.setToken(""); // Clear the token on logout
    },
  },
  extraReducers: (builder) => {
    // Agent registration
    builder.addCase(registerAgent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerAgent.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerAgent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Agent login
    builder.addCase(loginAgent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAgent.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginAgent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Client registration
    builder.addCase(registerClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerClient.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Client login
    builder.addCase(loginClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginClient.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ftech user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
