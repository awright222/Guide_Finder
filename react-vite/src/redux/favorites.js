import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure Axios to include credentials with each request
axios.defaults.withCredentials = true;

// Thunks with Authorization header
export const getFavoritesThunk = createAsyncThunk('favorites/getFavorites', async () => {
  const response = await axios.get('/api/favorites/');
  return response.data;
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async (serviceId) => {
  const response = await axios.post('/api/favorites/', { service_id: serviceId });
  return response.data;
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async (favoriteId) => {
  await axios.delete(`/api/favorites/${favoriteId}`);
  return favoriteId;
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoritesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavoritesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getFavoritesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;