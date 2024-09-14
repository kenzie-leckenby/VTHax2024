import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(''); // Clear input after sending the message
    }
  };

  return (
    <React.Fragment>
      {/* Full height container, with increased width */}
      <Container
        sx={{
          width: '100%',
          maxWidth: '1200px', // Adjust for wider container
          height: 'calc(100vh - 128px)', // Full vertical height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Chat Window */}
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%', // Subtract height for input area and padding
          }}
        >
          {/* Display Messages */}
          <Box sx={{ flexGrow: 1 }}>
            {messages.map((msg, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                {msg}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* Input Field and Send Button */}
        <Box
          sx={{
            display: 'flex',
            mt: 2,
            alignItems: 'center',
            paddingBottom: 2, // Additional padding at bottom
          }}
        >
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage(); // Send message on pressing Enter
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ ml: 2 }}
          >
            Send
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}