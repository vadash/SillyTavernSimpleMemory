// Message processing utilities for SimpleMemory Extension

import { SUMMARY_SENDER_NAME } from './constants.js';

/**
 * Find the index of the last summary message in the chat
 * @param {Array} chat - The chat messages array
 * @returns {number} Index of last summary, or -1 if none found
 */
export function findLastSummaryIndex(chat) {
    // Search backwards through chat for last SimpleMemory message
    for (let i = chat.length - 1; i >= 0; i--) {
        if (chat[i].name === SUMMARY_SENDER_NAME) {
            return i;
        }
    }
    return -1;
}

/**
 * Get messages that need to be summarized
 * @param {Array} chat - The chat messages array
 * @returns {Array} Messages to summarize (from last summary to end)
 */
export function getMessagesToSummarize(chat) {
    if (!chat || chat.length === 0) {
        return [];
    }
    
    const lastSummaryIndex = findLastSummaryIndex(chat);
    
    // Get messages from after last summary (or from start if no summary exists)
    const startIndex = lastSummaryIndex + 1;
    const messages = chat.slice(startIndex);
    
    // Filter out any system messages or empty messages
    return messages.filter(msg => {
        // Keep messages that have content and aren't from SimpleMemory
        return msg.mes && msg.mes.trim() && msg.name !== SUMMARY_SENDER_NAME;
    });
}

/**
 * Get the range of message IDs to hide
 * @param {Array} chat - The chat messages array
 * @returns {Object} Object with start and end indices for hiding
 */
export function getHideRange(chat) {
    const lastSummaryIndex = findLastSummaryIndex(chat);
    
    // Start from message after last summary (or 0 if no summary)
    const startIndex = lastSummaryIndex + 1;
    
    // End at the last message before our new summary
    const endIndex = chat.length - 1;
    
    if (startIndex > endIndex) {
        return null; // Nothing to hide
    }
    
    return {
        start: startIndex,
        end: endIndex
    };
}

/**
 * Check if a message contains an image
 * @param {Object} message - The message object
 * @returns {boolean} True if message contains an image
 */
export function messageHasImage(message) {
    // Check for image attachments or embedded images in the message
    // This checks for common image patterns in the message content
    const imagePatterns = [
        /<img\s+[^>]*src=/i,
        /\[img\]/i,
        /!\[.*?\]\(.*?\)/  // Markdown image syntax
    ];
    
    if (message.mes) {
        for (const pattern of imagePatterns) {
            if (pattern.test(message.mes)) {
                return true;
            }
        }
    }
    
    // Check if message has explicit image flag or attachment
    if (message.has_image || message.image || message.attachment) {
        return true;
    }
    
    return false;
}

/**
 * Get list of message indices that should not be hidden (images)
 * @param {Array} chat - The chat messages array
 * @param {number} startIndex - Start of range
 * @param {number} endIndex - End of range
 * @returns {Array} Array of indices to exclude from hiding
 */
export function getExcludedIndices(chat, startIndex, endIndex) {
    const excluded = [];
    
    for (let i = startIndex; i <= endIndex; i++) {
        if (chat[i] && messageHasImage(chat[i])) {
            excluded.push(i);
        }
    }
    
    return excluded;
}