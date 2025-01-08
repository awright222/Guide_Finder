import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

// Helper function to get JWT from localStorage
const getToken = () => localStorage.getItem('token');

// Restore user session
export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      console.warn("No token found. Skipping restore user process.");
      return null; // Return null instead of rejecting
    }

    try {
      const res = await fetch("/api/auth/", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to restore session.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error restoring session.");
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "session/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed.");
    }
  }
);

// Signup user
export const signup = createAsyncThunk(
  "session/signup",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Signup error occurred.");
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include',
      });
      localStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue("Logout failed. Please try again.");
    }
  }
);

// Create the session slice
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Restore User
      .addCase(restoreUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;