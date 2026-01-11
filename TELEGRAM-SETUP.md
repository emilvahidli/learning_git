# Telegram Bot Notification Setup

## 🎯 Məqsəd:

`admin.appeal` cədvəlinə yeni data düşəndə Telegram bot vasitəsilə bildiriş göndərmək.

**Bot Token:** `8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I`  
**Chat ID:** `-5072517302`

---

## ✅ Tövsiyə Olunan Metod: Backend-də Handle Etmək

Bu metod ən asan və etibarlıdır. Backend-də appeal yaradıldıqda Telegram göndərilir.

### **1. Backend-də Telegram Service Hazırdır:**

✅ `backend/src/services/telegramService.js` - Telegram göndərmə servisi  
✅ `backend/src/controllers/appealController.js` - Telegram göndərmə inteqrasiyası

### **2. Serverdə Setup:**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep/backend

# Git pull (yeni faylları çəkmək)
git pull origin main

# Dependencies install (yeni package yoxdur, amma yenidən install edin)
npm install

# Backend restart
pm2 restart proep-backend

# PM2 logs yoxlama
pm2 logs proep-backend --lines 50
```

### **3. Test:**

```bash
# Backend localhost-da test
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message for Telegram"
  }'

# Telegram-da bildiriş görünməlidir!
```

---

## 🔧 Database Trigger Metodu (Əlavə Setup Lazımdır)

Əgər database səviyyəsində trigger istəyirsinizsə, bir neçə variant var:

### **Metod 1: HTTP Extension (qeyri-məcburi)**

PostgreSQL-də HTTP request göndərmək üçün `http` extension quraşdırmaq lazımdır:

```bash
# Serverdə HTTP extension install
sudo apt-get update
sudo apt-get install postgresql-16-http  # Və ya 14

# PostgreSQL-də extension aktivləşdirmək
psql -h localhost -U pro -d proep
CREATE EXTENSION IF NOT EXISTS http;
\q
```

**Sonra SQL script işlətmək:**
```bash
psql -h localhost -U pro -d proep -f backend/src/config/telegram-trigger-setup.sql
```

### **Metod 2: Python Extension (qeyri-məcburi)**

PostgreSQL-də Python extension quraşdırmaq lazımdır:

```bash
# Serverdə Python extension install
sudo apt-get update
sudo apt-get install postgresql-plpython3-16  # Və ya 14

# PostgreSQL-də extension aktivləşdirmək
psql -h localhost -U pro -d proep
CREATE EXTENSION IF NOT EXISTS plpython3u;
\q
```

**Sonra Python versiyasını istifadə etmək:**
```sql
-- telegram-trigger-python.sql faylındakı kodu işlətmək
```

---

## 📋 Database Trigger Setup (İstəsəniz):

### **1. SQL Script İşlətmək:**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep/backend

# SQL script işlətmək (plpgsql versiyası - sadəcə log edir)
psql -h localhost -U pro -d proep -f src/config/telegram-trigger-setup.sql

# Və ya manual
psql -h localhost -U pro -d proep
\i src/config/telegram-trigger-setup.sql
\q
```

### **2. Trigger Yoxlama:**

```bash
# Trigger mövcuddur?
psql -h localhost -U pro -d proep -c "\d admin.appeal"

# Trigger funksiyası mövcuddur?
psql -h localhost -U pro -d proep -c "\df admin.send_telegram_notification"
```

### **3. Test (Database-dən birbaşa):**

```bash
psql -h localhost -U pro -d proep

# Manual insert (test üçün)
INSERT INTO admin.appeal (mail, phone_number, appeal, name, message)
VALUES ('test@example.com', '+994501234567', 1, 'Test User', 'Test message');

# Telegram-da bildiriş görünməlidir (əgər HTTP/Python extension quraşdırılıbsa)
\q
```

---

## ✅ Tövsiyə: Backend-də Handle Etmək

**Niyə?**
- ✅ Quraşdırma asandır (extension lazım deyil)
- ✅ Error handling daha yaxşıdır
- ✅ Logging daha yaxşıdır
- ✅ Retry logic əlavə etmək asandır
- ✅ Testing daha asandır

**Backend-də hazırdır:**
- ✅ `telegramService.js` - Telegram API servisi
- ✅ `appealController.js` - Appeal yaradıldıqda Telegram göndərilir

**Setup:**
```bash
cd ~/projects/proep/backend
git pull origin main
npm install
pm2 restart proep-backend
```

---

## 🧪 Test:

### **1. Backend API ilə Test:**

```bash
curl -X POST https://proep.az/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message for Telegram notification"
  }'
```

### **2. Telegram-da Yoxlama:**

Telegram-da bildiriş görünməlidir:
```
🆕 *Yeni Müraciət*

👤 *Ad:* Test User
📧 *E-poçt:* test@example.com
📱 *Telefon:* +994501234567
📋 *Müraciət Növü:* Web saytın yaradılması
💬 *Mesaj:* Test message for Telegram notification

🕐 *Tarix:* 10.01.2026 21:30:00
🆔 *ID:* 123
```

---

## 🔧 Troubleshooting:

### **Error: Telegram notification failed**

1. **Bot token və chat ID yoxlama:**
   - Bot token düzgündürmü?
   - Chat ID düzgündürmü? (group chat ID mənfi olmalıdır: -5072517302)

2. **Telegram API test:**
   ```bash
   curl -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
     -H "Content-Type: application/json" \
     -d '{
       "chat_id": "-5072517302",
       "text": "Test message"
     }'
   ```

3. **Backend logs yoxlama:**
   ```bash
   pm2 logs proep-backend --lines 100
   ```

### **Error: Database trigger not working**

1. **Trigger mövcuddur?**
   ```bash
   psql -h localhost -U pro -d proep -c "\d admin.appeal"
   ```

2. **Function mövcuddur?**
   ```bash
   psql -h localhost -U pro -d proep -c "\df admin.send_telegram_notification"
   ```

3. **Extension quraşdırılıb?**
   ```bash
   psql -h localhost -U pro -d proep -c "\dx"
   ```

---

## 📝 Qeyd:

Backend-də handle etmək tövsiyə olunur çünki:
- Database extension quraşdırmaq lazım deyil
- Daha etibarlıdır
- Error handling daha yaxşıdır
- Retry logic əlavə etmək asandır

Database trigger yalnız əgər backend olmadan işləmək istəyirsinizsə lazımdır (çox nadir hal).

---

**İndi backend-də setup edin və test edin!**
