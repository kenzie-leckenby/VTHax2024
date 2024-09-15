import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Paper, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { grey } from '@mui/material/colors';
import CharacterSheet from '~/components/CharacterSheet';

export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [characterData, setCharacterData] = React.useState<any>(null); // Adjust type if needed
  const [isD20Mode, setIsD20Mode] = React.useState(false); // State to toggle between text field and button

  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const getCharacterData = async () => {
    const res = await fetch('http://localhost:5000/getCharacterData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await res.json();
    setCharacterData(data.characterData);
  };

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

  const handleRollD20 = () => {
    // Handle the Roll D20 button click
    console.log("Roll D20 clicked");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Example character data (use real data from your API)
  const exampleCharacterData = {
    name: 'Aragorn',
    race: 'Human',
    className: 'Fighter',
    level: 5,
    abilities: { STR: 18, DEX: 15, CON: 14, INT: 12, WIS: 16, CHA: 10 },
    hitPoints: 40,
    gold: 150,
  };

  // For now, use exampleCharacterData if characterData is null
  const currentCharacterData = characterData || exampleCharacterData;

  return (
    <React.Fragment>
      {/* Full height container with two columns */}
      <Container
        sx={{
          width: '100%',
          height: 'calc(100vh - 128px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center', // Center the chat window horizontally
        }}
      >
        {/* Chat Window (centered) */}
        <Box
          sx={{
            flex: '0 1 800px', // Fixed width for chat window
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: '100%',
            }}
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
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Message Content with Conditional Styling */}
                  <Box
                    sx={(theme) => ({
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor: msg.sender === 'user' ? 'primary.main' : (theme.palette.mode === 'dark' ? 'background.paper' : grey[300]),
                      color: 'text.primary',
                      maxWidth: '80%',
                    })}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>
          </Paper>

          {/* Input Field or Roll D20 Button */}
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              alignItems: 'center',
              paddingBottom: 2,
            }}
          >
            {isD20Mode ? (
              <Button
                variant="contained"
                onClick={handleRollD20}
                sx={{ width: '100%' }} // Ensure button occupies full width
              >
                Roll D20
              </Button>
            ) : (
              <TextField
                label="Type your message..."
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendMessage} edge="end">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Box>
        </Box>

        {/* Character Sheet on the right */}
        <Box
          sx={{
            flex: '1 1 auto', // Take up remaining space
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 0,
            paddingLeft: 4,
            height: '100%',
            margin: '0 0 0 0',
          }}
        >
          <CharacterSheet
            name={currentCharacterData.name}
            race={currentCharacterData.race}
            className={currentCharacterData.className}
            level={currentCharacterData.level}
            abilities={currentCharacterData.abilities}
            hitPoints={currentCharacterData.hitPoints}
            gold={currentCharacterData.gold}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}








