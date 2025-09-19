# SimpleMemory
*A Scene-Based Chat Summarization Extension*

### Clean Chat History Through Scene Management

SimpleMemory provides a streamlined approach to managing long conversations by allowing you to mark scene endpoints and automatically generating summaries. The extension hides the original messages and keeps only the summaries visible in the chat context, maintaining a clean and manageable conversation history.

### How It Works

1. **Chat normally** with your LLM (messages 1-20)
2. **Press End Scene** when ready to summarize (its new overlay button)
3. **Extension processes** only the new messages since the last scene (or chat start)
4. **Original messages are hidden** (do not included in prompt history. Make sure not hide older summaries)
5. **Summary is added** as new message (/sendas name) from "SimpleMemory" 
6. **Continue chatting** with clean context containing only summaries

This creates a chat history where only scene summaries are visible to the LLM, while preserving all original messages in hidden form. We can assume evrything that SimpleMemory sends is summary so no need to track last summary and write extra metadata. We also keep this images visible to LLM at all times and ignore them when hiding after sumamrization. 

## Installation

Install like any other SillyTavern extension, with the Github link: `https://github.com/vadash/SillyTavernSimpleMemory`

## Configuration

No configuration needed

## Slash Commands

No commands
