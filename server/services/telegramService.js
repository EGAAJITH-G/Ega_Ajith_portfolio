import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends a structured, formatted markdown alert message to the configured Telegram chat.
 * @param {Object} errorDetails - The error telemetry object.
 * @param {string} errorDetails.message - Description of the error.
 * @param {string} errorDetails.stack - The stack trace or detail.
 * @param {string} errorDetails.path - The request URL/path where the error occurred.
 * @param {string} errorDetails.method - The HTTP method of the request.
 * @param {string} errorDetails.timestamp - ISO timestamp of the event.
 */
export const sendTelegramAlert = async (errorDetails) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Silently ignore if not configured yet to prevent server crashes
  if (!token || !chatId || token === 'your_copied_bot_token' || chatId === 'your_copied_chat_id') {
    console.log('[TELEGRAM ALERT] Bot alerts are not configured in .env. Skipping alert.');
    return;
  }

  // Sanitize stack trace or message details to prevent breaking markdown formatting
  const cleanStack = (errorDetails.stack || '')
    .substring(0, 400) // limit size to keep message concise
    .replace(/[_*`\[]/g, '\\$&'); // Escape markdown special characters
  const cleanMessage = (errorDetails.message || 'Unknown error').replace(/[_*`\[]/g, '\\$&');
  const cleanPath = (errorDetails.path || 'SYSTEM').replace(/[_*`\[]/g, '\\$&');
  const cleanMethod = (errorDetails.method || 'SYSTEM').replace(/[_*`\[]/g, '\\$&');

  const text = `⚠️ *PORTFOLIO SERVER TELEMETRY ALERT*

*Event:* Error Logged to Ledger
*Timestamp:* \`${errorDetails.timestamp || new Date().toISOString()}\`
*Path:* \`${cleanPath}\`
*Method:* \`${cleanMethod}\`

*Error Message:*
\`${cleanMessage}\`

*Stack Trace (Truncated):*
\`\`\`
${cleanStack}
\`\`\`
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('[TELEGRAM ALERT ERROR] Telegram API returned an error:', data.description);
    } else {
      console.log('[TELEGRAM ALERT] Error alert sent successfully to Telegram.');
    }
  } catch (error) {
    console.error('[TELEGRAM ALERT ERROR] Failed to send telemetry alert to Telegram:', error.message);
  }
};
