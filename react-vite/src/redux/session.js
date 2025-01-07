import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

// Helper function to get JWT from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue(null); 
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
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Trouble getting current user");
    }
  }
);

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
        return rejectWithValue("Unauthorized access. Please check your credentials.");
      }

      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "session/signup",
  async (
    {
      username,
      email,
      password,
      firstname,
      lastname,
      phone_num,
      address,
      city,
      state,
      zip,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          firstname,
          lastname,
          phone_num,
          address,
          city,
          state,
          zip,
        }),
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue("Unauthorized access. Please check your credentials.");
      }

      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include',
      });
      localStorage.removeItem('token');
      return;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default sessionSlice.reducer;
