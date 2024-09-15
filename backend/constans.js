
const tools = [
  {
    type: "function",
    function: {
      name: "RollStrength",
      description: "This will be used to tell the user to roll for the strength stat. This should be used whenever the user" +
       " wants to do something like lift an heavy object, push a character or anything that relatted that could require strength." + 
       " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where 20" +
                " is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      } 
    }
  },
  {
    type: "function",
    function: {
      name: "RollDexterity",
      description: "This will be used to tell the uset to roll for their dexterity stat. This should be used whenever the user wants" + 
      " to do something like throwing an object to hit an exact target, dodge an incoming object, escae a trap, or do anything where agility or dexterity is required." +
      " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where" + 
                " 20 is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "RollIntelligence",
      description: "This will be used to tell the user to roll their intelligence stat. Tihs should be used whenever the user wants" + 
      " to do something that may require them to recall any information, or anything that may require intellignce" + 
      " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where" + 
                " 20 is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "RollWisdom",
      description: "This will be used to tell the user to roll their wisdom stat. This should be used whenever the user wants to do something" +
       " like asses an environment for potentiall hidden objects like traps, treassure, characters, etc. as well as things like medicine, animals handling and detecting emotions and lies." +
       " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where" + 
                " 20 is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "RollCharisma",
      description: "This will be used to tell the user to roll their charisma stat. This will be used whenever the user wants" + 
      " to do something that involves social interactions with other characters, like persuading, lying, intimidation, and anything that may require an increased charisma to get away with " +
      " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where" + 
                " 20 is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "RollConstitution",
      description: "This will be used to tell the user to roll their constitution stat. This will be used whenever the user does something" + 
      " that requires endurance, which could be something like surviving poison, or anything where the player will need to have a good constitution to survive" +
      " Keep in mind that the user can only perform this action once before having to consider a new solution, or suffer the consequences if it is a timely effect.",
      parameters: {
        type: "object",
        properties: {
            difficulty: {
                type: "string",
                description: "The difficulty rating of the task that is trying to be acheived. This rating will vary from 1-20, where" + 
                " 20 is something that is almost impossible, while 1 is a very easy task",
            },
        },
        required: ["difficulty"]
      }
    }
  }
];

module.exports = {
  tools: tools,
};