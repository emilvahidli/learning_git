-- Telegram Bot Notification Trigger using Python (plpython3u)
-- Bu versiya http extension olmadan işləyir
-- Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
-- Chat ID: -5072517302

-- 1. PostgreSQL-də plpython3u extension aktivləşdirmək lazımdır
-- sudo apt-get install postgresql-plpython3-14 (və ya 16)
-- CREATE EXTENSION IF NOT EXISTS plpython3u;

-- 2. Create function to send Telegram notification (Python versiyası)
CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
RETURNS TRIGGER AS $$
import urllib.request
import urllib.parse
import json

telegram_url = 'https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage'
chat_id = '-5072517302'

# Appeal types mapping
appeal_types = {
    1: 'Web saytın yaradılması',
    2: 'AI Konsaltinq və Strategiya',
    3: 'Backend Development və API Həlləri',
    4: 'AI Model İnteqrasiyası',
    5: 'Avtomatlaşdırma Sistemləri',
    6: 'Data Analitika və Machine Learning',
    7: 'Mövcud Sistemin Təkmilləşdirilməsi',
    8: 'Texniki Dəstək və Konsaltinq',
    9: 'Digər'
}

# Mesaj formatı
message_text = f"""🆕 *Yeni Müraciət*

👤 *Ad:* {TD['new']['name']}
📧 *E-poçt:* {TD['new']['mail']}
📱 *Telefon:* {TD['new']['phone_number']}
📋 *Müraciət Növü:* {appeal_types.get(TD['new']['appeal'], 'Naməlum')}
💬 *Mesaj:* {TD['new']['message'][:500]}

🕐 *Tarix:* {TD['new']['created_date']}
🆔 *ID:* {TD['new']['id']}"""

# Telegram API request
data = {
    'chat_id': chat_id,
    'text': message_text,
    'parse_mode': 'Markdown'
}

try:
    req = urllib.request.Request(
        telegram_url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req, timeout=5) as response:
        result = json.loads(response.read().decode('utf-8'))
        if not result.get('ok'):
            plpy.warning(f'Telegram notification failed: {result}')
except Exception as e:
    plpy.warning(f'Telegram notification error: {str(e)}')

return 'MODIFY'
$$ LANGUAGE plpython3u;

-- 3. Create trigger on admin.appeal table
DROP TRIGGER IF EXISTS appeal_telegram_notification ON admin.appeal;
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION admin.send_telegram_notification();

-- 4. Comment
COMMENT ON FUNCTION admin.send_telegram_notification() IS 'Sends Telegram notification when new appeal is inserted using Python';
COMMENT ON TRIGGER appeal_telegram_notification ON admin.appeal IS 'Triggers Telegram notification after INSERT';
