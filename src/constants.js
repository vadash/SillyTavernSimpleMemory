// Constants for SimpleMemory Extension

// Extension identifier
export const EXTENSION_NAME = 'SimpleMemory';

// The name used for summary messages
export const SUMMARY_SENDER_NAME = 'SimpleMemory';

// Summarization prompt - improved version with clear instructions
export const SUMMARIZATION_PROMPT = `
Pause the roleplay. Right now, you are the Game Master, an entity in charge of the roleplay that develops the story and helps {{user}} keep track of roleplay events and states.
Your goal is to write a detailed report of the roleplay so far to help keep things focused and consistent. You must deep analyze the entire chat history, world info, characters, and character interactions, and then use this information to write the summary. This is a place for you to plan, avoid continuing the roleplay. Use markdown.
Your summary must consist of the following categories:
Main Characters: An extensive series of notes related to each major character. A major character must have directly interacted with {{user}} and have potential for development or mentioning in further story in some notable way. When describing characters, you must list their names, descriptions, any events that happened to them in the past. List how long they have known {{user}}.
Events: A list of major and minor events and interactions between characters that have occurred in the story so far. Major events must have played an important role in the story. Minor events must either have potential for development or being mentioned in further story.
Locations: Any locations visited by {{user}} or otherwise mentioned during the story. When describing a location, provide its name, general appearance, and what it has to do with {{user}}.
Objects: Notable objects that play an important role in the story or have potential for development or mentioning in further story in some big way. When describing an object, state its name, what it does, and provide a general description.
Minor Characters: Characters that do not play or have not yet played any major roles in the story and can be relegated to the 'background cast'.
Lore: Any other pieces of information regarding the world that might be of some importance to the story or roleplay.
Provide only the summary text without any preamble or additional formatting.
`;
