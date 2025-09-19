// Summary generation logic for SimpleMemory Extension

import { SUMMARIZATION_PROMPT, SUMMARY_SENDER_NAME } from './constants.js';
import { getMessagesToSummarize, getHideRange, getExcludedIndices } from './messages.js';

/**
 * Execute a slash command programmatically
 * @param {string} command - The command to execute (including /)
 * @returns {Promise} Promise that resolves when command completes
 */
async function executeSlashCommand(command) {
    const context = SillyTavern.getContext();
    
    // Use the executeSlashCommands function if available
    if (context.executeSlashCommands) {
        return await context.executeSlashCommands(command);
    }
    
    // Fallback: try to trigger command through the input
    const textarea = document.getElementById('send_textarea');
    if (textarea) {
        const originalValue = textarea.value;
        textarea.value = command;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Simulate enter key press
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        textarea.dispatchEvent(enterEvent);
        
        // Restore original value
        textarea.value = originalValue;
    }
    
    // Wait a bit for command to process
    return new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Generate a summary of the recent messages
 * @returns {Promise<string>} The generated summary text
 */
async function generateSummary() {
    const context = SillyTavern.getContext();
    const { generateQuietPrompt } = context;
    
    if (!generateQuietPrompt) {
        throw new Error('generateQuietPrompt function not available');
    }
    
    // Generate the summary using quiet prompt
    const result = await generateQuietPrompt({
        quietPrompt: SUMMARIZATION_PROMPT
    });
    
    return result || 'No summary generated.';
}

/**
 * Hide messages in the specified range, excluding images
 * @param {number} startIndex - Start index
 * @param {number} endIndex - End index  
 * @param {Array} excludedIndices - Indices to skip (images)
 */
async function hideMessages(startIndex, endIndex, excludedIndices) {
    // Build list of indices to actually hide
    const indicesToHide = [];
    
    for (let i = startIndex; i <= endIndex; i++) {
        if (!excludedIndices.includes(i)) {
            indicesToHide.push(i);
        }
    }
    
    if (indicesToHide.length === 0) {
        return; // Nothing to hide
    }
    
    // Group consecutive indices into ranges for efficient hiding
    const ranges = [];
    let currentRangeStart = indicesToHide[0];
    let currentRangeEnd = indicesToHide[0];
    
    for (let i = 1; i < indicesToHide.length; i++) {
        if (indicesToHide[i] === currentRangeEnd + 1) {
            currentRangeEnd = indicesToHide[i];
        } else {
            ranges.push([currentRangeStart, currentRangeEnd]);
            currentRangeStart = indicesToHide[i];
            currentRangeEnd = indicesToHide[i];
        }
    }
    ranges.push([currentRangeStart, currentRangeEnd]);
    
    // Execute hide commands for each range
    for (const [start, end] of ranges) {
        if (start === end) {
            await executeSlashCommand(`/hide ${start}`);
        } else {
            await executeSlashCommand(`/hide ${start}-${end}`);
        }
    }
}

/**
 * Add the summary as a message from SimpleMemory
 * @param {string} summaryText - The summary text to add
 */
async function addSummaryMessage(summaryText) {
    // Use sendas command to add message as SimpleMemory
    const command = `/sendas name="${SUMMARY_SENDER_NAME}" ${summaryText}`;
    await executeSlashCommand(command);
}

/**
 * Main summarization process
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function performSummarization() {
    try {
        const context = SillyTavern.getContext();
        const { chat } = context;
        
        if (!chat || chat.length === 0) {
            console.log('No messages to summarize');
            return false;
        }
        
        // Check if there are messages to summarize
        const messagesToSummarize = getMessagesToSummarize(chat);
        if (messagesToSummarize.length === 0) {
            console.log('No new messages to summarize');
            return false;
        }
        
        console.log(`Summarizing ${messagesToSummarize.length} messages`);
        
        // Generate the summary
        const summaryText = await generateSummary();
        
        // Get the range of messages to hide
        const hideRange = getHideRange(chat);
        
        if (hideRange) {
            // Get indices of messages with images (to exclude from hiding)
            const excludedIndices = getExcludedIndices(chat, hideRange.start, hideRange.end);
            
            // Hide the original messages (excluding images)
            await hideMessages(hideRange.start, hideRange.end, excludedIndices);
        }
        
        // Add the summary as a new message
        await addSummaryMessage(summaryText);
        
        console.log('Summarization completed successfully');
        return true;
        
    } catch (error) {
        console.error('Error during summarization:', error);
        return false;
    }
}