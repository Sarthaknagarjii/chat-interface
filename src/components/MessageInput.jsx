import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../features/chat/chatSlice";
import { Button, TextField, Box, Typography } from "@mui/material";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(message));
      setMessage("");
      setIsTyping(false); // Reset typing status when a message is sent
    }
  };

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false); // Reset typing status after 2 seconds of inactivity
    }, 2000);

    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setIsTyping(true); // Set typing status when user types
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        sx={{ ml: 1 }}
      >
        Send
      </Button>
      {isTyping && (
        <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
          Typing...
        </Typography>
      )}
    </Box>
  );
};

export default MessageInput;
