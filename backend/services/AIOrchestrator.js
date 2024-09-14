const OpenAI = require("openai");
require('dotenv').config();


// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OpenAIAPIKey
});


let assistant;
let thread;
async function setup() {
  assistant = await openai.beta.assistants.create({
    name: "AI Dungeon Master",
    description: "You are in charge of a table top role playing game, your job is to guide the game with the user's responses.",
    instructions:  "The user is a male wizard named Earl",
    model: "gpt-3.5-turbo",
  });
  thread = await openai.beta.threads.create();
}

setup();

async function submitRequest(message)  {
  // ChatGPT call structure with prompt

  const request = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: message
    }
  );

  let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: assistant.id,
    }
  );

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    for (const interaction of messages.data.reverse()) {
      console.log(`${interaction.role} > ${interaction.content[0].text.value}`);
    }
    messages.data.reverse();
    return messages.data[0].content[0].text.value;
  } else {
    console.log(run.status);
  }
}

module.exports = {
  submitRequest,
}