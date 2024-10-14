import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Button, Typography } from "@mui/material";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" my={4}>
          <Typography variant="h4">Chat Interface</Typography>
          <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>
            Toggle to {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </Box>
        <ChatWindow />
        <MessageInput />
      </Container>
    </ThemeProvider>
  );
};

export default App;
