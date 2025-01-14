import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
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
      console.log("Login request sent with email:", email, "and password:", password); // Log the request data
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(res, "res")
      console.log("Login response status:", res.status); // Log the response status

      const data = await res.json();

      console.log("Login response data:", data); // Log the response data

      if (!res.ok) {
        console.error("Login failed with status:", res.status, "and message:", data.message);
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.error("Login request failed:", error);
      console.log('FAILED!')
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Signup (User)
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
      // tokenUtils.setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Signup (Guide)
export const signupGuide = createAsyncThunk(
  "session/signupGuide",
  async (guideInfo, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/signup/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guideInfo),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Guide signup failed.");
      // tokenUtils.setToken(data.token); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Logout
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
      // .addCase(restoreUser.pending, setLoading)
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(restoreUser.rejected, setError)

      // .addCase(login.pending, setLoading)
      .addCase(login.fulfilled, (state, action) => {
        console.log("login successful", action.payload);
        state.loading = false;
        state.user = action.payload;    //action.payload.user?
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Login failed:", action.payload); // Log the error payload
        state.loading = false;
        state.errors = action.payload;
      })

      // .addCase(signup.pending, setLoading)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, setError)

      // .addCase(signupGuide.pending, setLoading)  
      .addCase(signupGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(signupGuide.rejected, setError)

      // .addCase(logout.pending, setLoading)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, setError);
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;
