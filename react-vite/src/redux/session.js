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
      console.log("Attempting to restore user...");
      const res = await fetch("/api/auth/");
      const data = await res.json();

      if (!res.ok) {
        console.log("Failed to restore user:", data);
        return rejectWithValue(data);
      }

      console.log("User restored successfully:", data);
      return data;
    } catch (error) {
      console.log("Error restoring user:", error.message);
      return rejectWithValue(error.message || "Trouble getting current user");
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
    try {
      console.log("Attempting to sign up...");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Signup failed:", data);
        throw new Error(data.message || "Signup failed.");
      }

      console.log("Signup successful:", data);
      return data;
    } catch (error) {
      console.log("Error signing up:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// export const logout = createAsyncThunk(
//   "session/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("Attempting to log out...");
//       await fetch("/api/auth/logout");
//       console.log("Logout successful");
//       return;
//     } catch (error) {
//       console.log("Error logging out:", error.message);
//       return rejectWithValue(error.message || "Logout failed");
//     }
//   }
// );

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Attempting to log out...");
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",  // Ensure cookies are handled correctly
      });
      console.log("Logout successful");

      // Reset the Redux state
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
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
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
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : action.payload.is_manager ? 'manager' : 'user'; 
        console.log("!!!!!!!!!!!!!!!!!!!!!HERERestore user fulfilled:", action.payload); 
      })
      .addCase(restoreUser.rejected, setError)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Ensure user data is being set correctly
        state.userRole = action.payload.role; // Set userRole correctly based on the payload
        console.log("Login fulfilled:", action.payload);
      })
      .addCase(login.rejected, setError)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : action.payload.is_manager ? 'manager' : 'user';  
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userRole = action.payload.is_guide ? 'guide' : action.payload.is_manager ? 'manager' : 'user';
      })
      .addCase(updateProfile.rejected, setError)
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userRole = null;
        console.log("Logout fulfilled");
      })
      .addCase(signup.rejected, setError)
      // .addCase(logout.fulfilled, (state) => {
      //   Object.assign(state, initialState); // Reset the entire state using initialState
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