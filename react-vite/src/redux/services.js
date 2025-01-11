import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchServices = createAsyncThunk('services/fetchServices', async (filters = {}) => {
    try {
        console.log('Fetching services from API with filters:', filters);
        const query = new URLSearchParams(filters).toString();
        const response = await axios.get(`/api/services?${query}`);
        console.log('Services fetched successfully:', response.data);
        return response.data.services || response.data; // Flatten data if nested
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
});

export const fetchService = createAsyncThunk('services/fetchService', async (serviceId) => {
    try {
        console.log(`Fetching service with ID: ${serviceId}`);
        const response = await axios.get(`/api/services/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service:', error);
        throw error;
    }
});

export const updateService = createAsyncThunk('services/updateService', async ({ serviceId, formData }) => {
    try {
        console.log(`Updating service with ID: ${serviceId}`);
        const response = await axios.put(`/api/services/${serviceId}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
});

export const deleteService = createAsyncThunk('services/deleteService', async (serviceId) => {
    try {
        console.log(`Deleting service with ID: ${serviceId}`);
        await axios.delete(`/api/services/${serviceId}`);
        return serviceId;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
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
            console.log('Clearing all services from the state');
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
                console.log('Fetching services...');
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                console.log('Services successfully fetched and stored:', state.items);
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.error('Error fetching services:', state.error);
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                const index = state.items.findIndex(service => service.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
                console.log('Single service fetched and added to state:', action.payload);
            })
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.items.findIndex(service => service.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                    console.log(`Service with ID: ${action.payload.id} updated successfully`);
                }
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.items = state.items.filter(service => service.id !== action.payload);
                console.log(`Service with ID: ${action.payload} deleted successfully`);
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.error = action.error.message;
                console.error('Error fetching single service:', action.error.message);
            })
            .addCase(updateService.rejected, (state, action) => {
                state.error = action.error.message;
                console.error('Error updating service:', action.error.message);
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.error = action.error.message;
                console.error('Error deleting service:', action.error.message);
            });
    },
});

export const { clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;