// Telegram Bot Service
// Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
// Chat ID: -5072517302

import https from 'https';
import { URL } from 'url';

const TELEGRAM_BOT_TOKEN = '8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I';
const TELEGRAM_CHAT_ID = '-5072517302';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Appeal types mapping
const APPEAL_TYPES = {
  1: 'Web saytın yaradılması',
  2: 'AI Konsaltinq və Strategiya',
  3: 'Backend Development və API Həlləri',
  4: 'AI Model İnteqrasiyası',
  5: 'Avtomatlaşdırma Sistemləri',
  6: 'Data Analitika və Machine Learning',
  7: 'Mövcud Sistemin Təkmilləşdirilməsi',
  8: 'Texniki Dəstək və Konsaltinq',
  9: 'Digər',
};

/**
 * Send Telegram notification
 * @param {Object} appealData - Appeal data from database
 * @returns {Promise<Object>} Telegram API response
 */
export async function sendTelegramNotification(appealData) {
  try {
    const appealType = APPEAL_TYPES[appealData.appeal] || 'Naməlum';
    const messageText = `🆕 *Yeni Müraciət*

👤 *Ad:* ${escapeMarkdown(appealData.name)}
📧 *E-poçt:* ${escapeMarkdown(appealData.mail)}
📱 *Telefon:* ${escapeMarkdown(appealData.phone_number)}
📋 *Müraciət Növü:* ${escapeMarkdown(appealType)}
💬 *Mesaj:* ${escapeMarkdown(appealData.message.substring(0, 500))}

🕐 *Tarix:* ${formatDate(appealData.created_date)}
🆔 *ID:* ${appealData.id}`;

    const payload = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: messageText,
      parse_mode: 'Markdown',
    });

    // Use https.request for Node.js compatibility (works with all versions)
    return new Promise((resolve, reject) => {
      const url = new URL(TELEGRAM_API_URL);
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (!result.ok) {
              console.error('Telegram notification failed:', result);
              reject(new Error(`Telegram API error: ${result.description || 'Unknown error'}`));
            } else {
              resolve(result);
            }
          } catch (error) {
            console.error('Error parsing Telegram response:', error);
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        console.error('Telegram request error:', error);
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw error;
  }
}

/**
 * Escape Markdown special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeMarkdown(text) {
  if (!text) return '';
  return String(text)
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default {
  sendTelegramNotification,
};
