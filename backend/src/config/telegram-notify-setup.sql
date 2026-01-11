-- Telegram Bot Notification using NOTIFY/LISTEN pattern
-- Bu ən təhlükəsiz və tövsiyə olunan yoldur
-- Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
-- Chat ID: -5072517302

-- 1. Create function to send NOTIFY event
CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
RETURNS TRIGGER AS $$
DECLARE
    appeal_type_text TEXT;
    payload JSONB;
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
    
    -- Create payload
    payload := jsonb_build_object(
        'id', NEW.id,
        'name', NEW.name,
        'mail', NEW.mail,
        'phone_number', NEW.phone_number,
        'appeal', NEW.appeal,
        'appeal_type', appeal_type_text,
        'message', substring(NEW.message from 1 for 500),
        'created_date', to_char(NEW.created_date, 'DD.MM.YYYY HH24:MI:SS')
    );
    
    -- Send NOTIFY event (backend LISTEN edəcək)
    PERFORM pg_notify('new_appeal', payload::text);
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Notification error: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Create trigger
DROP TRIGGER IF EXISTS appeal_telegram_notification ON admin.appeal;
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION admin.send_telegram_notification();

-- 3. Comments
COMMENT ON FUNCTION admin.send_telegram_notification() IS 'Sends NOTIFY event when new appeal is inserted (backend will listen and send Telegram)';
COMMENT ON TRIGGER appeal_telegram_notification ON admin.appeal IS 'Triggers NOTIFY event after INSERT';
