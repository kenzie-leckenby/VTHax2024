import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'ai' }[]>([]);

  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const handleResponse = async () => {
    const res = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    console.log(data);
    setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: 'ai' }]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      handleResponse();
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
          sx={(theme) => ({
            flexGrow: 1,
            overflowY: 'auto', // Ensure vertical scrolling
            padding: 2,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Use full remaining height
            maxHeight: '100%', // Ensure that overflow is handled
          })}
        >
          {/* Display Messages with Scrollable Box */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100%' }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', // Align messages based on sender
                }}
              >
                {/* Message Content with Conditional Styling */}
                <Box
                  sx={(theme) => ({
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: msg.sender === 'user'
                      ? (theme.palette.mode === 'dark' ? '#0056b3' : 'primary.main') // Dark blue color for dark mode
                      : 'background.paper',
                    color: msg.sender === 'user'
                      ? (theme.palette.mode === 'dark' ? 'text.primary' : 'white')
                      : 'text.primary',
                    maxWidth: '80%', // Limit width of message box
                  })}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Box>
              </Box>
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
            autoComplete="off"
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





