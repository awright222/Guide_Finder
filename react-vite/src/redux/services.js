import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchServices = createAsyncThunk('services/fetchServices', async (filters = {}) => {
    console.log('Fetching services from API with filters:', filters);
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`/api/services/search?${query}`, { withCredentials: true });
    
    // Flatten
    const services = Array.isArray(response.data) 
        ? response.data 
        : response.data.services || [];
    
    console.log('Services fetched successfully:', services);
    return services;
});

export const fetchService = createAsyncThunk('services/fetchService', async (serviceId) => {
    const response = await axios.get(`/api/services/${serviceId}`, { withCredentials: true });
    return response.data;
});

export const createService = createAsyncThunk('services/createService', async (formData) => {
    const response = await axios.post('/api/services/', formData, { withCredentials: true });
    return response.data;
});

export const updateService = createAsyncThunk('services/updateService', async ({ serviceId, formData }) => {
    const response = await axios.put(`/api/services/${serviceId}`, formData, { withCredentials: true });
    return response.data;
});

export const deleteService = createAsyncThunk('services/deleteService', async (serviceId) => {
    await axios.delete(`/api/services/${serviceId}`, { withCredentials: true });
    return serviceId;
});

// Slice
const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearServices: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                const index = state.items.findIndex(service => service.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.items.findIndex(service => service.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.items = state.items.filter(service => service.id !== action.payload);
            });
    },
});

export const { clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;