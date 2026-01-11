-- Telegram Bot Notification Trigger for admin.appeal table
-- Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
-- Chat ID: -5072517302

-- 1. Create function to send Telegram notification
-- Bu funksiya admin.appeal cədvəlinə yeni data düşəndə Telegram-ə bildiriş göndərir

CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
RETURNS TRIGGER AS $$
DECLARE
    telegram_url TEXT := 'https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage';
    chat_id TEXT := '-5072517302';
    message_text TEXT;
    response TEXT;
BEGIN
    -- Mesaj formatı
    message_text := format(
        '🆕 *Yeni Müraciət*\n\n' ||
        '👤 *Ad:* %s\n' ||
        '📧 *E-poçt:* %s\n' ||
        '📱 *Telefon:* %s\n' ||
        '📋 *Müraciət Növü:* %s\n' ||
        '💬 *Mesaj:* %s\n\n' ||
        '🕐 *Tarix:* %s\n' ||
        '🆔 *ID:* %s',
        NEW.name,
        NEW.mail,
        NEW.phone_number,
        CASE NEW.appeal
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
        END,
        substring(NEW.message from 1 for 500), -- İlk 500 simvol
        to_char(NEW.created_date, 'DD.MM.YYYY HH24:MI:SS'),
        NEW.id
    );
    
    -- HTTP request göndərmək üçün pg_net extension istifadə edirik
    -- Əgər pg_net yoxdursa, plpython3u istifadə edə bilərik
    
    -- Telegram API-ə POST request
    SELECT content INTO response
    FROM http((
        'POST',
        telegram_url,
        ARRAY[
            http_header('Content-Type', 'application/json')
        ],
        'application/json',
        json_build_object(
            'chat_id', chat_id,
            'text', message_text,
            'parse_mode', 'Markdown'
        )::text
    )::http_request);
    
    -- Error handling (log-da saxlayırıq, amma exception atmayırıq ki insert dayanmasın)
    IF response IS NULL OR response NOT LIKE '%"ok":true%' THEN
        RAISE WARNING 'Telegram notification failed: %', response;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Error olsa belə, insert prosesi davam etsin
        RAISE WARNING 'Telegram notification error: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Create trigger on admin.appeal table
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION admin.send_telegram_notification();

-- 3. Comment
COMMENT ON FUNCTION admin.send_telegram_notification() IS 'Sends Telegram notification when new appeal is inserted';
COMMENT ON TRIGGER appeal_telegram_notification ON admin.appeal IS 'Triggers Telegram notification after INSERT';
