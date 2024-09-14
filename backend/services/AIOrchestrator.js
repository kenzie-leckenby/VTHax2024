const OpenAI = require("openai");
require('dotenv').config();


// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OpenAIAPIKey
});

async function submitRequest(message)  {
  // ChatGPT call structure with prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are in charge of a table top role playing game, and the user is a male wizard name Earl. Your job is to guide the game with the user's responses.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: .3,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // Extracting the response from OpenAI
  const aiResponse = response.choices[0].message.content;
  console.log(`AI Response: ${aiResponse}`);
  return aiResponse;
}

module.exports = {
  submitRequest,
}