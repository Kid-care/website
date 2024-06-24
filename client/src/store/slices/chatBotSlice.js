// chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendChatMessageAsync = createAsyncThunk(
  "chat/sendMessage",
  async (message) => {
    const response = await axios.post(
      "https://gemini-chatbot-8c18.onrender.com/chat",
      { msg: message }
    );
    return response.data.response;
  }
);

const chatBotSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({ text: action.payload, from: "bot" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatMessageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ text: action.payload, from: "bot" });
      })
      .addCase(sendChatMessageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { addMessage } = chatBotSlice.actions;

export default chatBotSlice.reducer;
