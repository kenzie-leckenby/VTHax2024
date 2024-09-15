import * as React from 'react';
import { Box, Button, TextField, Typography, Container, Paper, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { grey } from '@mui/material/colors';
import CharacterSheet from '~/components/CharacterSheet';

type AbilityScores = {
  STR: number;
  INT: number;
  WIS: number;
  DEX: number;
  CON: number;
  CHA: number;
};

type CharacterData = {
  name: string;
  abilities?: AbilityScores;
  race?: string;
  class?: string;
  spell?: string;
  hitPoints?: number;
  gold?: number;
  level?: number;
};
export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [isD20Mode, setIsD20Mode] = React.useState(false); // State to toggle between text field and button
  const [isLoading, setIsLoading] = React.useState(false); // potential loading state for better ux
  const [activeAbiity, setActiveAbility] = React.useState('');
  const [characterData, setCharacterData] = React.useState<CharacterData>({ name: '' });

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

    getCharacterData();

  const getModifier = (modifierType: string): number => {
    if (characterData.abilities != undefined){
      let val;
      switch (modifierType) {
        case "Strength":
          val = characterData.abilities.STR;
          break;
        case "Desterity":
          val = characterData.abilities.DEX;
          break;
        case "Intelligence":
          val = characterData.abilities.INT;
          break;
        case "Wisdom":
          val = characterData.abilities.WIS;
          break;
        case "Charisma":
          val = characterData.abilities.CHA;
          break;
        case "Constitution":
          val = characterData.abilities.CON;
          break;
        default:
          return 0;
      }
      
      if(val <= 3) {
        return -3;
      } else if (val <= 5) {
        return -2;
      } else if (val <= 8) {
        return -1;
      } else if (val <= 12) {
        return 0;
      } else if (val <= 15) {
        return 1;
      } else if (val <= 17) {
        return 2;
      } else {
        return 3;
      }
    }
  
  }

  const askAI = async () => {
    const res = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if ((data.answer).includes("{{TOOL}}")) {
      // uts in a state for the D20 to be rolled, so that the button handles the rest of the progression.
      setIsD20Mode(true);
      const ability: string = (data.answer).substring((data.answer).indexOf("Roll") + 4, (data.answer).indexOf(">>"))
      setActiveAbility(ability);
    
    } else {
      setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: 'ai' }]);
    }
  };
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      askAI();
      setMessage(''); // Clear input after sending the message
    }
  };

  const handleRollD20 = async () => {
    // Handle the Roll D20 button click
    
    const value = Math.floor(Math.random() * 20) + 1 + getModifier(activeAbiity);;
    
    setMessages((prevMessages) => [...prevMessages, { text: "You Rolled: " + value.toString() , sender: 'ai' }]);

    const res = await fetch('http://localhost:5000/respond', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    })
  
    const data = await res.json();

    setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: 'ai' }]);
    setIsD20Mode(false);
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
          maxWidth: '1200px',
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
                Roll D20 {activeAbiity} Check
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
            padding: 2,
            height: '100%',
          }}
        >
          <CharacterSheet
            name={currentCharacterData.name || "John Doe"}
            race={currentCharacterData.race || "NONE"}
            className={currentCharacterData.class || "NONE"}
            level={currentCharacterData.level || 0}
            abilities={currentCharacterData.abilities || {NONE: 0}}
            hitPoints={currentCharacterData.hitPoints || 0}
            gold={currentCharacterData.gold || 0}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}








