import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await fetch('/api/bookings/user');
  const data = await response.json();
  return data;
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: { items: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default bookingsSlice.reducer;