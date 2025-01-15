import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userRole: null, 
  loading: false,
  errors: null,
};

export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/");
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
      });
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

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
      if (!res.ok) throw new Error(data.message || "Signup failed.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetch("/api/auth/logout");
      return;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    const setError = (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    };

    builder
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : 'user';  
      })
      .addCase(restoreUser.rejected, setError)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : 'user'; 
      })
      .addCase(login.rejected, setError)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : 'user';  
      })
      .addCase(signup.rejected, setError)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userRole = null;  
      })
      .addCase(logout.rejected, setError);
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;