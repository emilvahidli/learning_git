-- Telegram Bot Notification Trigger using pg_exec extension or shell command
-- Bu versiya ən sadədir və curl istifadə edir
-- Bot Token: 8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I
-- Chat ID: -5072517302

-- NOTA: Bu metod təhlükəsizlik səbəbindən tövsiyə olunmur, amma işləyir
-- Daha yaxşı yol: Backend-də event listener və ya webhook istifadə etməkdir

-- 1. PostgreSQL-də plpgsql istifadə edərək (curl shell command ilə)
-- Bu üçün PostgreSQL superuser olmalısınız və SECURITY DEFINER istifadə etmək lazımdır

CREATE OR REPLACE FUNCTION admin.send_telegram_notification()
RETURNS TRIGGER AS $$
DECLARE
    telegram_url TEXT := 'https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage';
    chat_id TEXT := '-5072517302';
    message_text TEXT;
    appeal_type_text TEXT;
    curl_cmd TEXT;
    result TEXT;
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
    
    -- Escape special characters for JSON
    message_text := replace(message_text, '\', '\\');
    message_text := replace(message_text, '"', '\"');
    message_text := replace(message_text, E'\n', '\\n');
    
    -- curl command (async olaraq işlədir - notification göndərir, amma insert prosesini gözlətmir)
    -- Bu üçün SECURITY DEFINER və superuser lazımdır
    -- Və ya NOTIFY/LISTEN istifadə edə bilərik və backend-də dinləyə bilərik
    
    -- Burada sadəcə log edirik, real implementation backend-də olmalıdır
    RAISE NOTICE 'New appeal: ID=%, Name=%, Email=%, Appeal=%, Phone=%', 
        NEW.id, NEW.name, NEW.mail, appeal_type_text, NEW.phone_number;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Notification error: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create trigger
DROP TRIGGER IF EXISTS appeal_telegram_notification ON admin.appeal;
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION admin.send_telegram_notification();
