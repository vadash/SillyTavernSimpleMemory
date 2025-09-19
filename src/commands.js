// Slash command registration and handling for SimpleMemory Extension

import { performSummarization } from './summarizer.js';

/**
 * Handler for the /end command
 * @returns {Promise<string>} Result message
 */
async function handleEndCommand() {
    console.log('SimpleMemory: /end command triggered');
    
    // Show processing message
    toastr.info('Generating summary...', 'SimpleMemory');
    
    // Perform the summarization
    const success = await performSummarization();
    
    if (success) {
        toastr.success('Scene summary created', 'SimpleMemory');
        return 'Scene summarized successfully';
    } else {
        toastr.warning('No messages to summarize', 'SimpleMemory');
        return 'No new messages found to summarize';
    }
}

/**
 * Register the /end slash command with SillyTavern
 */
export function registerEndCommand() {
    const { SlashCommandParser, SlashCommand } = SillyTavern.getContext();
    
    if (!SlashCommandParser || !SlashCommand) {
        console.error('SimpleMemory: Slash command system not available');
        return;
    }
    
    // Register using the new SlashCommandParser API
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'end',
        callback: handleEndCommand,
        returns: 'status message',
        namedArgumentList: [],
        unnamedArgumentList: [],
        helpString: `
            <div>
                <strong>SimpleMemory - End Scene Command</strong>
            </div>
            <div>
                Summarizes all messages from the last summary (or start of chat) to the current point.
                The original messages are hidden and replaced with a concise summary.
                Images in the original messages are preserved and remain visible.
            </div>
            <div>
                <strong>Usage:</strong>
                <ul>
                    <li><code>/end</code> - Create a summary of the recent scene</li>
                </ul>
            </div>
            <div>
                <strong>Notes:</strong>
                <ul>
                    <li>Summaries are posted as messages from "SimpleMemory"</li>
                    <li>Each summary acts as a scene boundary for the next /end command</li>
                    <li>Hidden messages remain in chat history but are excluded from context</li>
                </ul>
            </div>
        `,
    }));
    
    console.log('SimpleMemory: /end command registered');
}