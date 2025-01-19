import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (serviceId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/reviews/service/${serviceId}`);
    return { serviceId, reviews: response.data };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error gracefully
      return rejectWithValue('Unauthorized access');
    }
    throw error;
  }
});

export const createReview = createAsyncThunk('reviews/createReview', async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/reviews/', reviewData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const updateReview = createAsyncThunk('reviews/updateReview', async ({ reviewId, reviewData }) => {
  const response = await axios.put(`/api/reviews/${reviewId}`, reviewData);
  return response.data;
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (reviewId) => {
  await axios.delete(`/api/reviews/${reviewId}`);
  return reviewId;
});

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    averageRatings: {}, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { serviceId, reviews } = action.payload;
        state.items = Array.isArray(reviews) ? reviews : [];
        state.averageRatings[serviceId] = calculateAverageRating(state.items);
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
        const serviceId = action.payload.service_id;
        state.averageRatings[serviceId] = calculateAverageRating(state.items.filter(review => review.service_id === serviceId));
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(review => review.id === action.payload.id);
        state.items[index] = action.payload;
        const serviceId = action.payload.service_id;
        state.averageRatings[serviceId] = calculateAverageRating(state.items.filter(review => review.service_id === serviceId));
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const reviewId = action.payload;
        const serviceId = state.items.find(review => review.id === reviewId).service_id;
        state.items = state.items.filter(review => review.id !== reviewId);
        state.averageRatings[serviceId] = calculateAverageRating(state.items.filter(review => review.service_id === serviceId));
      });
  }
});

export default reviewsSlice.reducer;