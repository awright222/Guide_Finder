import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

// const tokenUtils = {
//   getToken: () => localStorage.getItem('token'),
//   setToken: (token) => localStorage.setItem('token', token),
//   clearToken: () => localStorage.removeItem('token'),

//   getCSRFToken: () => {
//       const csrfMatch = document.cookie.match(/(^|;\s*)csrf_token=([^;]*)/);
//       return csrfMatch ? csrfMatch[2] : null;
//   }
// };

//! Restore User (ORIGINAL)
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

//! TESTING 2 restore user   // get 403 Forbidden

// export const restoreUser = createAsyncThunk(
//   "session/restoreUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch("/api/auth/", {
//         method: "GET",
//         credentials: "include", // Include credentials (cookies) in the request
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-Token": getCsrfToken(), // Include CSRF token if required
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data);
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message || "Trouble getting current user");
//     }
//   }
// );

// // Helper function to get CSRF token from cookies
// const getCsrfToken = () => {
//   const name = "csrf_token=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// };

//! TESTING 1 restore user
// export const restoreUser = createAsyncThunk(
//   "session/restoreUser",
//   async (_, { rejectWithValue }) => {
//       try {
//           await fetch("/api/auth/csrf", { credentials: 'include' });

//           const token = tokenUtils.getToken();
//           if (!token) return null;

//           const res = await fetch("/api/auth/", {
//               headers: { Authorization: `Bearer ${token}` },
//               credentials: 'include',
//           });
//           if (!res.ok) throw new Error("Failed to restore session.");
//           return await res.json();
//       } catch (error) {
//           return rejectWithValue(error.message);
//       }
//   }
// );

// Login
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
// export const login = createAsyncThunk(
//   "session/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//         const csrfToken = tokenUtils.getCSRFToken();
//         console.log("CSRF Token:", csrfToken);
//         if (!csrfToken) {
//             throw new Error("CSRF token not found. Please refresh the page.");
//         }

//         const res = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-CSRF-Token": csrfToken  
//             },
//             body: JSON.stringify({ email, password }),
//             credentials: 'include' 
//         });

//         if (!res.ok) {
//             const errorData = await res.json();
//             throw new Error(errorData.errors || "Login failed.");
//         }

//         const data = await res.json();
//         tokenUtils.setToken(data.token); 
//         return data;
//     } catch (error) {
//       console.error("Login error:", error);
//         return rejectWithValue(error.message);
//     }
// });


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
      tokenUtils.setToken(data.token);
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
      tokenUtils.setToken(data.token); 
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
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include',
      });
      tokenUtils.clearToken();
    } catch (error) {
      return rejectWithValue("Logout failed. Please try again.");
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
    const setLoading = (state) => {
      state.loading = true;
      state.errors = null;
    };
    const setError = (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    };

    builder
      .addCase(restoreUser.pending, setLoading)
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(restoreUser.rejected, setError)

      .addCase(login.pending, setLoading)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, setError)

      .addCase(signup.pending, setLoading)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, setError)

      .addCase(signupGuide.pending, setLoading)  
      .addCase(signupGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(signupGuide.rejected, setError)

      .addCase(logout.pending, setLoading)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, setError);
  },
});

export const { resetErrors } = sessionSlice.actions;
export default sessionSlice.reducer;
