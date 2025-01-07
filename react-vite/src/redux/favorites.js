import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFavoritesThunk = createAsyncThunk(
  'favorites/getFavorites',
  async (_, { getState }) => {
    const state = getState();
    const token = state.session.user?.token; 

    const response = await fetch('/api/favorites', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    const data = await response.json();
    return data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoritesThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default favoritesSlice.reducer;