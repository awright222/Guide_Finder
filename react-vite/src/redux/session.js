import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userRole: null, 
  csrfToken: null, 
  loading: false,
  errors: null,
};

export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Attempting to restore user...");
      const res = await fetch("/api/auth/", {
        credentials: "include"
      });

      if (!res.ok) {
        const errorText = await res.text(); 
        console.log("Failed to restore user:", errorText);
        return rejectWithValue(errorText);
      }

      const data = await res.json();
      console.log("User restored successfully:", data);
      return data;
    } catch (error) {
      console.log("Error restoring user:", error.message);
      return rejectWithValue(error.message || "Trouble getting current user");
    }
  }
);

export const fetchCsrfToken = createAsyncThunk(
  "session/fetchCsrfToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/csrf/restore");
      console.log('CSRF token fetch response status:', response.status); 
      console.log('CSRF token fetch response headers:', response.headers); 

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const result = await response.json();
      console.log('CSRF token fetched successfully:', result); 
      return result;
    } catch (error) {
      console.error('Error fetching CSRF token:', error.message); 
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "session/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Attempting to log in...");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
      const data = await res.json();

      if (!res.ok) {
        console.log("Login failed:", data);
        return rejectWithValue(data);
      }

      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.log("Error logging in:", error.message);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "session/signup",
  async (userInfo, { rejectWithValue }) => {
    const csrfToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("csrf_token="))
      ?.split("=")[1];

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    });

    console.log("Server response status:", res.status);
    console.log("Server response headers:", res.headers);

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return rejectWithValue({ general: "An unexpected error occurred. Please try again." });
    }

    console.log("Server response data:", data);

    if (!res.ok) {
      console.error("Signup failed with status:", res.status);
      console.error("Signup error details:", data.errors);  
      return rejectWithValue(data.errors || data);
    }

    return data;
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Attempting to log out...");
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",  
      });
      console.log("Logout successful");

  
      return { user: null, userRole: null };
    } catch (error) {
      console.log("Error logging out:", error.message);
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "session/updateProfile",
  async (userInfo, { rejectWithValue }) => {
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find(row => row.startsWith("csrf_token="))
        ?.split("=")[1];

      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, 
        },
        body: JSON.stringify(userInfo),
        credentials: "include", 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "session/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include", 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      console.log("Error occurred!!!:", action.payload);
    };

    builder
      .addCase(restoreUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : action.payload.is_manager ? 'manager' : 'user'; 
        console.log("Restore user fulfilled:", action.payload); 
      })
      .addCase(restoreUser.rejected, setError)
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.csrfToken = action.payload.csrf_token;
      })
      .addCase(fetchCsrfToken.rejected, setError)
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
        state.userRole = action.payload.role; 
        console.log("Login fulfilled:", action.payload);
      })
      .addCase(login.rejected, setError)
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.errors = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : action.payload.is_manager ? 'manager' : 'user';
      })
      .addCase(updateProfile.rejected, setError)
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userRole = null;
        console.log("Logout fulfilled");
      })
      .addCase(deleteUser.rejected, setError)
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userRole = null;
        state.loading = false;
        state.errors = null;
        console.log("State fully reset");
      })
      .addCase(logout.rejected, setError);
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;