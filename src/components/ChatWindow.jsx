import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, IconButton } from "@mui/material";
import { receiveMessage } from "../features/chat/chatSlice";
import Avatar from "@mui/material/Avatar";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Picker } from "emoji-mart";

const ChatWindow = () => {
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.chat.currentUser);
  const chatEndRef = useRef(null);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(null);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 0 && Math.random() < 0.5) {
        dispatch(receiveMessage("This is a simulated response!"));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiSelect = (emoji, messageId) => {
    setReactions((prev) => ({
      ...prev,
      [messageId]: emoji.native,
    }));
    setShowPicker(null);
  };

  const handleEmojiButtonClick = (messageId) => {
    setShowPicker(showPicker === messageId ? null : messageId);
  };

  return (
    <Box
      sx={{
        height: "70vh",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        position: "relative",
      }}
    >
      {messages.map((msg) => (
        <Box
          key={msg.id}
          mb={1}
          sx={{
            textAlign: msg.user === currentUser ? "right" : "left",
          }}
        >
          <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {msg.user} - {msg.timestamp}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              backgroundColor: msg.user === currentUser ? "#e0f7fa" : "#f1f1f1",
              padding: "8px 12px",
              borderRadius: "10px",
              maxWidth: "60%",
            }}
          >
            {msg.text}
          </Typography>

          <IconButton onClick={() => handleEmojiButtonClick(msg.id)}>
            <EmojiEmotionsIcon />
          </IconButton>

          {showPicker === msg.id && (
            <Picker
              onSelect={(emoji) => handleEmojiSelect(emoji, msg.id)}
              style={{ position: "absolute", zIndex: 1000 }}
              title="Pick your emoji…"
              emoji="point_up"
            />
          )}

          {reactions[msg.id] && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {reactions[msg.id]}
            </Typography>
          )}
        </Box>
      ))}
      <div ref={chatEndRef} />
    </Box>
  );
};

export default ChatWindow;
