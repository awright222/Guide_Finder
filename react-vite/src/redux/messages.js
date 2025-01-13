import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  conversations: [],
  messages: [],
  loading: false,
  errors: null,
};

// Async Thunks
export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/messages/user");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error fetching conversations: ${data.message}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching conversations");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (guideId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/messages/conversation/${guideId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error fetching messages: ${data.message}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching messages");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error sending message: ${data.message}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error sending message");
    }
  }
);

// Slice
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default messagesSlice.reducer;