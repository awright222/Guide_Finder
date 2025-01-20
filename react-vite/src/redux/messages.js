import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  messages: [],
  loading: false,
  errors: null,
};

export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/messages/user");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ userId, guideId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/messages/conversation/${userId}/${guideId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
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
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteConversation = createAsyncThunk(
  "messages/deleteConversation",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/messages/conversation/${conversationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return conversationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    })
    .addCase(deleteConversation.pending, (state) => {
      state.loading = true;
      state.errors = null;
    })
    .addCase(deleteConversation.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = state.conversations.filter(
        (conversation) => conversation.id !== action.payload
      );
    })
    .addCase(deleteConversation.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
},
});

export default messagesSlice.reducer;
