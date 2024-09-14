import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);

  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(''); // Clear input after sending the message
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <React.Fragment>
      {/* Full height container */}
      <Container
        sx={{
          width: '100%',
          maxWidth: '1200px', // Adjust for wider container
          height: 'calc(100vh - 128px)', // Full vertical height minus some space for header or padding
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
            overflowY: 'auto', // Ensure vertical scrolling
            padding: 2,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Use full remaining height
            maxHeight: '100%', // Ensure that overflow is handled
          }}
        >
          {/* Display Messages with Scrollable Box */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100%' }}>
            {messages.map((msg, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                {msg}
              </Typography>
            ))}
            <div ref={messagesEndRef} />
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
