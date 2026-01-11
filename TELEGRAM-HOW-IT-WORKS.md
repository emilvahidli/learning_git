# Telegram Bildirişi - Necə İşləyir?

## ✅ İndi İşləyir!

Telegram bildirişi backend-də handle edilir, database trigger deyil.

---

## 🔄 İşləmə Mexanizmi:

### **1. Frontend-dən Form Göndərilir:**

```
User → https://proep.az/contact/az → Form doldurur → "Göndər" basır
```

### **2. Frontend Backend API-yə Sorğu Göndərir:**

```
Frontend (https://proep.az/contact/az)
  ↓ POST request
Backend API (https://proep.az/api/appeal)
  ↓
POST /api/appeal
Body: {
  mail: "user@example.com",
  phone_number: "+994501234567",
  appeal: 1,
  name: "User Name",
  message: "User message"
}
```

### **3. Backend-də Appeal Yaradılır:**

**`backend/src/controllers/appealController.js`:**
```javascript
export const createAppeal = async (req, res) => {
  // 1. Database-ə appeal yazılır
  const result = await client.query(
    `INSERT INTO admin.appeal (mail, phone_number, appeal, name, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [mail, phone_number, appeal, name, message]
  );

  const newAppeal = result.rows[0]; // Database-dən yeni appeal data

  // 2. Telegram bildirişi göndərilir (async, blocking etmir)
  sendTelegramNotification(newAppeal).catch(error => {
    console.error('Failed to send Telegram notification:', error);
    // Error olsa belə, response göndərilir (request fail olmur)
  });

  // 3. Success response göndərilir
  res.status(201).json({
    success: true,
    message: 'Appeal created successfully',
    data: newAppeal
  });
};
```

### **4. Telegram Service Telegram API-yə Sorğu Göndərir:**

**`backend/src/services/telegramService.js`:**
```javascript
export async function sendTelegramNotification(appealData) {
  // 1. Mesaj formatlanır
  const messageText = `🆕 *Yeni Müraciət*
  
👤 *Ad:* ${appealData.name}
📧 *E-poçt:* ${appealData.mail}
📱 *Telefon:* ${appealData.phone_number}
📋 *Müraciət Növü:* ${appealType}
💬 *Mesaj:* ${appealData.message}
...`;

  // 2. Telegram API-yə HTTPS request göndərilir
  const payload = JSON.stringify({
    chat_id: "-5072517302",
    text: messageText,
    parse_mode: "Markdown"
  });

  // 3. HTTPS request göndərilir
  https.request('https://api.telegram.org/bot.../sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  });
}
```

### **5. Telegram Bot Mesajı Göndərir:**

```
Telegram API → Telegram Bot → Your Chat/Group → 📨 Bildiriş görünür!
```

---

## ⚡ İşləmə Xronologiyası:

```
1. User form-u doldurur və "Göndər" basır
   ↓ (0ms)

2. Frontend POST request göndərir → https://proep.az/api/appeal
   ↓ (50ms)

3. Backend appealController.js çağırılır
   ↓ (100ms)

4. Database-ə appeal yazılır (INSERT)
   ↓ (150ms)

5. Database-dən yeni appeal data qaytarılır
   ↓ (200ms)

6. Telegram notification async başlayır (await yoxdur!)
   ↓ (250ms) ─────────────────┐
                              │
7. Backend success response göndərir ← (260ms)  │
   ↓                                         │
8. Frontend success mesajı göstərir ← (300ms)  │
   │                                         │
   └─────────────────────────────────────────┘
   │
   ↓ (async, parallel işləyir)
   
9. Telegram API-yə HTTPS request göndərilir (300-500ms)
   ↓

10. Telegram API response (ok: true)
    ↓

11. Telegram-da bildiriş görünür! (500-1000ms)
```

---

## 🎯 Vacib Qeydlər:

### **1. Async və Non-Blocking:**

```javascript
// Telegram göndərilir, amma response gözləmir
sendTelegramNotification(newAppeal).catch(error => {
  console.error('Failed to send Telegram notification:', error);
  // Error olsa belə, response göndərilir
});

// Dərhal response göndərilir (Telegram göndərilməsini gözləmir)
res.status(201).json({ success: true, ... });
```

**Niyə?**
- User response gözləmir (daha sürətli)
- Telegram API yavaş olsa belə, user heç bir problem görmür
- Error olsa belə, appeal database-ə yazıldı

### **2. Database Trigger Deyil, Backend Handle Edir:**

**❌ Database Trigger (istəmirik):**
```sql
CREATE TRIGGER appeal_telegram_notification
AFTER INSERT ON admin.appeal
FOR EACH ROW
EXECUTE FUNCTION send_telegram_notification(); -- PostgreSQL-də HTTP request çətindir
```

**✅ Backend Handle Edir (istəyirik):**
```javascript
// appealController.js-də
const newAppeal = result.rows[0];
sendTelegramNotification(newAppeal); // Node.js-də asandır
```

**Üstünlükləri:**
- ✅ Extension lazım deyil
- ✅ Error handling daha yaxşıdır
- ✅ Logging daha yaxşıdır
- ✅ Retry logic əlavə etmək asandır
- ✅ Testing daha asandır

### **3. Real-time Bildiriş:**

Form göndərildikdə:
1. Appeal database-ə yazılır (200ms)
2. Backend response göndərir (250ms)
3. Frontend success mesajı göstərir (300ms)
4. Telegram bildirişi gəlir (500-1000ms)

**Hər şey real-time işləyir!**

---

## 📊 İşləmə Diagramı:

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ POST /api/appeal
       ↓
┌─────────────────────────┐
│   Frontend              │
│  (Contact Form)         │
└──────┬──────────────────┘
       │
       │ HTTPS POST
       ↓
┌─────────────────────────┐
│   Nginx                 │
│  (Reverse Proxy)        │
│  /api → localhost:3000  │
└──────┬──────────────────┘
       │
       │ Proxy
       ↓
┌─────────────────────────┐
│   Backend               │
│  (Express.js)           │
│  Port: 3000             │
└──────┬──────────────────┘
       │
       ├─→ POST /api/appeal
       │
       │   1. Validation
       │   2. Database INSERT
       │   3. Get new appeal data
       │   4. sendTelegramNotification() ← Async
       │   5. Return success response
       │
       ↓                    ↓
┌─────────────────┐  ┌─────────────────────────┐
│   PostgreSQL    │  │  Telegram Service       │
│   Database      │  │  (telegramService.js)   │
│                 │  └──────┬──────────────────┘
│  admin.appeal   │         │
│  table          │         │ HTTPS POST
└─────────────────┘         ↓
                      ┌─────────────────────────┐
                      │  Telegram API           │
                      │  api.telegram.org       │
                      └──────┬──────────────────┘
                             │
                             │ Bot sends message
                             ↓
                      ┌─────────────────────────┐
                      │  Telegram Chat/Group    │
                      │  Chat ID: -5072517302   │
                      │                         │
                      │  📨 Bildiriş görünür!   │
                      └─────────────────────────┘
```

---

## 🔧 Kod Strukturu:

### **1. Appeal Controller (`appealController.js`):**

```javascript
import { sendTelegramNotification } from '../services/telegramService.js';

export const createAppeal = async (req, res) => {
  // 1. Database-ə yaz
  const result = await client.query('INSERT INTO ... RETURNING *');
  const newAppeal = result.rows[0];

  // 2. Telegram göndər (async, non-blocking)
  sendTelegramNotification(newAppeal).catch(error => {
    console.error('Telegram error:', error);
  });

  // 3. Response göndər (Telegram gözləmir)
  res.status(201).json({ success: true, data: newAppeal });
};
```

### **2. Telegram Service (`telegramService.js`):**

```javascript
export async function sendTelegramNotification(appealData) {
  // 1. Mesaj formatla
  const messageText = formatMessage(appealData);
  
  // 2. Telegram API-yə HTTPS request göndər
  const payload = JSON.stringify({
    chat_id: "-5072517302",
    text: messageText,
    parse_mode: "Markdown"
  });

  // 3. HTTPS request
  return new Promise((resolve, reject) => {
    const req = https.request(telegramUrl, options, (res) => {
      // Response handle et
      resolve(result);
    });
    req.write(payload);
    req.end();
  });
}
```

---

## ⚡ Niyə Bu Yol Yaxşıdır?

### **Üstünlükləri:**

1. **Real-time:** Form göndərildikdə dərhal işləyir
2. **Non-blocking:** User response gözləmir
3. **Error handling:** Telegram error olsa belə, appeal yazılır
4. **Asan:** Extension lazım deyil, Node.js built-in
5. **Logging:** Bütün prosesi log-da görə bilərsiniz
6. **Testing:** Asan test etmək olar

### **Database Trigger Yoxdur:**

- ❌ PostgreSQL-də HTTP request çətindir
- ❌ Extension quraşdırmaq lazımdır
- ❌ Error handling çətindir
- ❌ Testing çətindir

---

## 🎯 Nəticə:

**İndi necə işləyir:**
1. ✅ User form-u doldurur
2. ✅ Frontend backend-ə POST request göndərir
3. ✅ Backend appeal-i database-ə yazır
4. ✅ Backend Telegram API-yə bildiriş göndərir (async)
5. ✅ Backend user-ə success response göndərir
6. ✅ Telegram-da bildiriş görünür!

**Real-time, async, və etibarlı!** 🚀

---

## 📝 Log-larda Görünəcək:

```bash
pm2 logs proep-backend --lines 0
```

**Görməli olduğunuz:**
```
2026-01-10T21:58:23.239Z - POST /api/appeal
📤 Sending Telegram notification for appeal ID: 8
📋 Appeal data: {"id":8,"name":"Test User",...}
📨 Telegram payload: {"chat_id":"-5072517302",...}
📡 Telegram request sent to: https://api.telegram.org/...
📬 Telegram API response: {"ok":true,"result":{...}}
✅ Telegram notification sent successfully!
```

---

**Bu sistem real-time işləyir və hər appeal üçün Telegram bildirişi göndərilir!** 🎉
