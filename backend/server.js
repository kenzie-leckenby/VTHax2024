const express = require('express');
const bodyParser = require('body-parser');
const AIOrchestrator = require('./services/AIOrchestrator');
const cors = require('cors');  


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
      res.status(200).json({ answer: `${response}`} );
 
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));