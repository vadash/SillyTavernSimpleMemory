# SimpleMemory
*A Scene-Based Chat Summarization Extension*

### Clean Chat History Through Scene Management

SimpleMemory provides a streamlined approach to managing long conversations by automatically generating summaries of scene segments. The extension hides the original messages and keeps only the summaries visible in the chat context, maintaining a clean and manageable conversation history.

### How It Works

1. **Chat normally** with your LLM
2. **Type `/end`** when ready to summarize the current scene
3. **Extension automatically**:
   - Finds the last summary (or chat start if none exists)
   - Processes all messages since that point
   - Hides the original messages (excluding images which remain visible)
   - Adds a concise summary as a message from "SimpleMemory"
4. **Continue chatting** with clean context containing only summaries and recent messages

This creates a chat history where scene summaries act as natural boundaries. Each summary from "SimpleMemory" becomes a marker for the next `/end` command, eliminating the need for manual tracking.

## Installation

Install like any other SillyTavern extension, with the Github link: `https://github.com/vadash/SillyTavernSimpleMemory`

## Configuration

No configuration needed

## Slash Commands

- `/end` - Summarizes all messages from the last "SimpleMemory" summary (or chat start) to the current point
