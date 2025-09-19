// Constants for SimpleMemory Extension

// Extension identifier
export const EXTENSION_NAME = 'SimpleMemory';

// The name used for summary messages
export const SUMMARY_SENDER_NAME = 'SimpleMemory';

// Summarization prompt - improved version with clear instructions
export const SUMMARIZATION_PROMPT = `Summarize the key facts, events, and character developments in this scene. Focus on:
- Important story developments and plot points
- Character actions, decisions, and emotional states
- Significant dialogue or revelations
- Changes in relationships or settings

Keep the summary concise (under 300 words) and write it in present tense as if describing ongoing events. Include only the essential information needed to understand what happened in this scene.

If there are existing summaries in the conversation, treat them as context but focus only on summarizing the new content since the last summary.

Provide only the summary text without any preamble or additional formatting.`;