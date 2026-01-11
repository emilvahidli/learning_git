-- Telegram Bot Notification Trigger (Database Level)
-- Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
-- Chat ID: -5072517302

-- Metod 1: PostgreSQL http extension istifadə edərək
-- Bu üçün http extension quraşdırmaq lazımdır:
-- sudo apt-get install postgresql-14-http (və ya 16)
-- CREATE EXTENSION IF NOT EXISTS http;

-- Metod 2: Python extension istifadə edərək (plpython3u)
-- Bu üçün Python extension quraşdırmaq lazımdır:
-- sudo apt-get install postgresql-plpython3-14 (və ya 16)
-- CREATE EXTENSION IF NOT EXISTS plpython3u;

-- Metod 3: Backend-də handle etmək (Tövsiyə olunur - daha asan və etibarlı)
-- Backend-də appeal yaradıldıqda Telegram göndərilir (appealController.js-də)

-- ==========================================
-- OPTION 1: HTTP Extension ilə (qeyri-məcburi)
-- ==========================================

-- 1. HTTP extension aktivləşdirmək
-- CREATE EXTENSION IF NOT EXISTS http;

-- 2. Telegram notification function (HTTP extension ilə)
CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
RETURNS TRIGGER AS $$
DECLARE
    telegram_url TEXT := 'https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage';
    chat_id TEXT := '-5072517302';
    message_text TEXT;
    appeal_type_text TEXT;
    response TEXT;
BEGIN
    -- Appeal type mapping
    appeal_type_text := CASE NEW.appeal
        WHEN 1 THEN 'Web saytın yaradılması'
        WHEN 2 THEN 'AI Konsaltinq və Strategiya'
        WHEN 3 THEN 'Backend Development və API Həlləri'
        WHEN 4 THEN 'AI Model İnteqrasiyası'
        WHEN 5 THEN 'Avtomatlaşdırma Sistemləri'
        WHEN 6 THEN 'Data Analitika və Machine Learning'
        WHEN 7 THEN 'Mövcud Sistemin Təkmilləşdirilməsi'
        WHEN 8 THEN 'Texniki Dəstək və Konsaltinq'
        WHEN 9 THEN 'Digər'
        ELSE 'Naməlum'
    END;
    
    -- Mesaj formatı
    message_text := format(
        '🆕 *Yeni Müraciət*' || E'\n\n' ||
        '👤 *Ad:* %s' || E'\n' ||
        '📧 *E-poçt:* %s' || E'\n' ||
        '📱 *Telefon:* %s' || E'\n' ||
        '📋 *Müraciət Növü:* %s' || E'\n' ||
        '💬 *Mesaj:* %s' || E'\n\n' ||
        '🕐 *Tarix:* %s' || E'\n' ||
        '🆔 *ID:* %s',
        NEW.name,
        NEW.mail,
        NEW.phone_number,
        appeal_type_text,
        substring(NEW.message from 1 for 500),
        to_char(NEW.created_date, 'DD.MM.YYYY HH24:MI:SS'),
        NEW.id
    );
    
    -- HTTP extension ilə Telegram API-ə request göndərmək
    -- NOTA: HTTP extension quraşdırılmalıdır
    -- SELECT content INTO response
    -- FROM http((
    --     'POST',
    --     telegram_url,
    --     ARRAY[http_header('Content-Type', 'application/json')],
    --     'application/json',
    --     json_build_object('chat_id', chat_id, 'text', message_text, 'parse_mode', 'Markdown')::text
    -- )::http_request);
    
    -- Əgər HTTP extension yoxdursa, sadəcə log edirik
    RAISE NOTICE 'New appeal notification: ID=%, Name=%, Email=%, Appeal=%', 
        NEW.id, NEW.name, NEW.mail, appeal_type_text;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Error olsa belə, insert prosesi davam etsin
        RAISE WARNING 'Telegram notification error: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- OPTION 2: Python Extension ilə
-- ==========================================

-- 1. Python extension aktivləşdirmək
-- CREATE EXTENSION IF NOT EXISTS plpython3u;

-- 2. Telegram notification function (Python ilə)
-- CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
-- RETURNS TRIGGER AS $$
-- import urllib.request
-- import urllib.parse
-- import json
-- 
-- telegram_url = 'https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage'
-- chat_id = '-5072517302'
-- 
-- appeal_types = {
--     1: 'Web saytın yaradılması',
--     2: 'AI Konsaltinq və Strategiya',
--     3: 'Backend Development və API Həlləri',
--     4: 'AI Model İnteqrasiyası',
--     5: 'Avtomatlaşdırma Sistemləri',
--     6: 'Data Analitika və Machine Learning',
--     7: 'Mövcud Sistemin Təkmilləşdirilməsi',
--     8: 'Texniki Dəstək və Konsaltinq',
--     9: 'Digər'
-- }
-- 
-- message_text = f"""🆕 *Yeni Müraciət*
-- 
-- 👤 *Ad:* {TD['new']['name']}
-- 📧 *E-poçt:* {TD['new']['mail']}
-- 📱 *Telefon:* {TD['new']['phone_number']}
-- 📋 *Müraciət Növü:* {appeal_types.get(TD['new']['appeal'], 'Naməlum')}
-- 💬 *Mesaj:* {TD['new']['message'][:500]}
-- 
-- 🕐 *Tarix:* {TD['new']['created_date']}
-- 🆔 *ID:* {TD['new']['id']}"""
-- 
-- data = {
--     'chat_id': chat_id,
--     'text': message_text,
--     'parse_mode': 'Markdown'
-- }
-- 
-- try:
--     req = urllib.request.Request(
--         telegram_url,
--         data=json.dumps(data).encode('utf-8'),
--         headers={'Content-Type': 'application/json'}
--     )
--     with urllib.request.urlopen(req, timeout=5) as response:
--         result = json.loads(response.read().decode('utf-8'))
--         if not result.get('ok'):
--             plpy.warning(f'Telegram notification failed: {result}')
-- except Exception as e:
--     plpy.warning(f'Telegram notification error: {str(e)}')
-- 
-- return 'MODIFY'
-- $$ LANGUAGE plpython3u;

-- ==========================================
-- Trigger yaratmaq (hansı metod istifadə edirsə)
-- ==========================================

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS appeal_telegram_notification ON admin.appeal;

-- Create trigger
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION admin.send_telegram_notification();

-- Comments
COMMENT ON FUNCTION admin.send_telegram_notification() IS 'Sends Telegram notification when new appeal is inserted (requires http or plpython3u extension)';
COMMENT ON TRIGGER appeal_telegram_notification ON admin.appeal IS 'Triggers Telegram notification after INSERT';
