import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    currentUser: "User1",
  },
  reducers: {
    sendMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        text: action.payload,
        user: state.currentUser,
        timestamp: new Date().toLocaleTimeString(),
        status: "sent", // Add status here
      };
      state.messages.push(newMessage);
    },
    receiveMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        text: action.payload,
        user: "Bot", // Assuming a bot or another user
        timestamp: new Date().toLocaleTimeString(),
        status: "delivered", // Add status for received messages
      };
      state.messages.push(newMessage);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
