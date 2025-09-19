// SimpleMemory Extension - Entry Point
// Minimal initialization file that sets up the /end slash command

import { registerEndCommand } from './src/commands.js';

// Initialize extension when jQuery and SillyTavern are ready
jQuery(async () => {
    // Register the /end slash command
    registerEndCommand();
    
    console.log('SimpleMemory extension loaded');
});