const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const AIOrchestrator = require('./services/AIOrchestrator');
const fs = require("fs");

const app = express();
app.use(bodyParser.json());


app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Used to prompt the AI model directly
app.post('/ask', async (req, res) => {
    const { message } = req.body;

    try {
      response = await AIOrchestrator.submitRequest(message);
      // Sending the response back as JSON
      res.status(200).json({ answer: `${response}`} );    
 
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
});

// Used to give a resposne to a function call from the AI model
app.post('/respond', async (req, res) => {
  const { value } = req.body;
  console.log(value);
  try {
    response = await AIOrchestrator.submit_tool_outputs(value.toString())
    res.status(200).json({answer: `${response}`})
  } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
});

// Used to store character data
app.post('/storeCharacterData', async (req, res) => {
    fs.writeFile("./character_sheets/currentUser.json", JSON.stringify(req.body), (error, result) => {
      if (error) {
        console.error("Unable to write Character Data.", error)
        res.status(500).json({error: "Cannot store data!"});
      } else {
        res.status(200);
      }
    })
  
});

// Used to retrieve character data
app.get('/getCharacterData', async (req, res) => {
  fs.readFile("./character_sheets/currentUser.json", "utf8", (error, data) => {
    if (error) {
      console.error("Character data not found", error);
      res.status(500).json({error: "No character data available!"});
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));