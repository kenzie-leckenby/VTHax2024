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

app.post('/ask', async (req, res) => {
    const { message } = req.body;

    try {
      response = await AIOrchestrator.submitRequest(message);
      // Sending the response back as JSON

      if (response.includes("{{TOOL}}")) {
        res.status(200).json({ answer: `${response}`.replace("{{TOOL}}", "")})
      } else {
        res.status(200).json({ answer: `${response}`} );
      }      
 
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
});

app.post('/respond', async (req, res) => {
  const { message } = req.body;

  try {
    response = await AIOrchestrator.submit_tool_outputs(message)

  } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
});

app.post('/storeCharacterData', async (req, res) => {
    fs.writeFile("./character_sheets/currentUser.json", JSON.stringify(req.body), (error, result) => {
      if (error) {
        console.error("Unable to write Character Data.", error)
        res.status(500).json({error: "Cannot store data!"});
      } else {
        console.log("data stored");
        res.status(200);
      }
    })
  
});

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