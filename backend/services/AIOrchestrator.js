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
    description: "",
    instructions:  "You are in charge of a table top role playing game, your job is to guide the game and properlly set the scene of what is currently hapenning in the game." +
      "You have access to a vector search that contains the rules for the game you are running. The user is playing a character that is a Wizard named Earl.",
    tools: [{ type: "file_search" }],
    tool_resources: {
      file_search: {
        vector_store_ids: ["vs_i2QGTUjskhz5mIIeFfk2Z52B"]
      }
    },
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