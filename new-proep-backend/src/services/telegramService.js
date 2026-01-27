// Telegram Bot Service
import https from 'https';
import { URL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-5072517302';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/**
 * Send Telegram notification for new appeal
 * @param {Object} appealData - Appeal data
 * @returns {Promise<Object>} Telegram API response
 */
export async function sendTelegramNotification(appealData) {
    try {
        console.log('📤 Sending Telegram notification for appeal:', appealData?.name);

        const messageText = `🆕 *Yeni Müraciət (New Design)*

👤 *Ad:* ${escapeMarkdown(appealData.name || '')}
📧 *E-poçt:* ${escapeMarkdown(appealData.email || '')}
💬 *Mesaj:* ${escapeMarkdown((appealData.message || '').substring(0, 500))}

🕐 *Tarix:* ${formatDate(new Date())}`;

        const payload = JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: 'Markdown',
        });

        return new Promise((resolve, reject) => {
            const url = new URL(TELEGRAM_API_URL);
            const options = {
                hostname: url.hostname,
                port: 443,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                },
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const result = JSON.parse(data);
                        if (result.ok) {
                            console.log('✅ Telegram notification sent successfully!');
                            resolve(result);
                        } else {
                            console.error('❌ Telegram notification failed:', result);
                            reject(new Error(result.description || 'Unknown error'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', (error) => {
                console.error('❌ Telegram request error:', error);
                reject(error);
            });

            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Telegram request timeout'));
            });

            req.write(payload);
            req.end();
        });
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        throw error;
    }
}

function escapeMarkdown(text) {
    if (!text) return '';
    return String(text)
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        .replace(/`/g, '\\`')
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleString('az-AZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default { sendTelegramNotification };
