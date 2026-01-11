# Telegram Notification Debug

## 🔍 Problem:

Backend appeal uğurlu yaradıldı, amma Telegram-a bildiriş gəlmir.

## ✅ Yoxlama Komandaları:

### **1. Serverdə telegramService.js Faylı Mövcuddur?**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep/backend

# telegramService.js faylı mövcuddur?
ls -la src/services/telegramService.js

# Əgər yoxdursa, git pull edin
git pull origin main
ls -la src/services/
```

### **2. Backend Log-ları Yoxlama:**

```bash
# PM2 log-ları (son 100 sətir)
pm2 logs proep-backend --lines 100 --nostream

# Error log-ları
pm2 logs proep-backend --err --lines 50 --nostream

# Real-time log-ları (yeni test zamanı)
pm2 logs proep-backend --lines 0
```

### **3. Telegram API Test (Manual):**

```bash
# Telegram API-ə birbaşa test
curl -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "-5072517302",
    "text": "Test mesajı - Telegram bot işləyir!"
  }'

# Əgər uğurlu olarsa, Telegram-da mesaj görünməlidir
```

### **4. Backend Restart (Yeni Kod üçün):**

```bash
cd ~/projects/proep/backend

# Git pull (yeni faylları çəkmək)
git pull origin main

# Dependencies install (yeni package yoxdur, amma yenidən install edin)
npm install

# Backend restart
pm2 restart proep-backend

# PM2 status
pm2 list
pm2 logs proep-backend --lines 20
```

### **5. Backend Test (Yeni Appeal ilə):**

```bash
# Yeni appeal yaratmaq və log-ları izləmək
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test2@example.com",
    "phone_number": "+994509876543",
    "appeal": 1,
    "name": "Test User 2",
    "message": "Test message 2 for Telegram"
  }'

# Eyni zamanda log-ları izləyin (başqa terminal-də)
pm2 logs proep-backend --lines 0
```

---

## 🐛 Çox Yayılmış Problemler:

### **Problem 1: telegramService.js Faylı Serverdə Yoxdur**

**Həll:**
```bash
cd ~/projects/proep/backend
git pull origin main
ls -la src/services/telegramService.js  # Mövcud olmalıdır
npm install
pm2 restart proep-backend
```

### **Problem 2: Telegram API Error**

**Test:**
```bash
# Telegram API test
curl -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "-5072517302", "text": "Test"}'
```

**Error ola bilər:**
- Bot token yanlışdır
- Chat ID yanlışdır (group chat ID mənfi olmalıdır)
- Bot group-a əlavə olunmayıb

### **Problem 3: Backend Log-da Error Görünmür**

**Həll:**
```bash
# Backend log-ları daha ətraflı yoxlama
pm2 logs proep-backend --lines 200 --nostream | grep -i telegram
pm2 logs proep-backend --lines 200 --nostream | grep -i error
```

### **Problem 4: Appeal Data Field-ləri Uyğun Gəlmir**

**Yoxlama:**
- Database-dən gələn data-də `mail` field-ı varmı? (Bəli, var)
- telegramService-də `appealData.mail` istifadə olunur (düzgündür)

---

## 🔧 Quick Fix:

**Serverdə işlədirsiniz:**

```bash
# 1. Git pull (yeni faylları çəkmək)
cd ~/projects/proep/backend
git pull origin main

# 2. telegramService.js mövcuddur?
ls -la src/services/telegramService.js

# 3. Backend restart
npm install
pm2 restart proep-backend

# 4. Log-ları izləyin (real-time)
pm2 logs proep-backend --lines 0

# 5. Yeni test (başqa terminal-də)
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{"mail":"test@example.com","phone_number":"+994501234567","appeal":1,"name":"Test","message":"Test"}'
```

---

## ✅ Telegram API Test:

**Manual test (Telegram-da görünməlidir):**

```bash
curl -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "-5072517302",
    "text": "🆕 Test mesajı - Bot işləyir!"
  }'
```

**Əgər bu uğurlu olarsa, Telegram-da mesaj görünməlidir. Əgər görünmürsə, bot token və ya chat ID problemi var.**

---

## 📋 Checklist:

- [ ] Git pull edildi (telegramService.js faylı mövcuddur)
- [ ] Backend restart edildi (PM2)
- [ ] Backend log-ları yoxlanıldı (error var?)
- [ ] Telegram API manual test edildi (işləyir?)
- [ ] Appeal data field-ləri uyğundur (mail, name, etc.)
- [ ] Bot token düzgündür
- [ ] Chat ID düzgündür (mənfi group ID: -5072517302)

**İndi bu komandaları serverdə işlədin və nəticəni bildirin!**
