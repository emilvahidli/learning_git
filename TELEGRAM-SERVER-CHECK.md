# Telegram Notification - Serverdə Yoxlama

## 🔍 Problem:

Backend appeal uğurlu yaradıldı, amma Telegram-a bildiriş gəlmir.

## ✅ Serverdə Yoxlama Komandaları:

### **1. Git Pull (Yeni Faylları Çəkmək):**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep/backend

# Git pull
git pull origin main

# telegramService.js faylı mövcuddur?
ls -la src/services/telegramService.js

# Əgər yoxdursa, yenidən pull
git status
git pull origin main --force
```

### **2. Backend Restart:**

```bash
cd ~/projects/proep/backend

# Dependencies install
npm install

# Backend restart
pm2 restart proep-backend

# PM2 status
pm2 list

# PM2 logs (son 50 sətir)
pm2 logs proep-backend --lines 50 --nostream
```

### **3. Telegram API Manual Test:**

```bash
# Telegram API-ə birbaşa test (Telegram-da görünməlidir)
curl -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "-5072517302",
    "text": "🧪 Test mesajı - Bot işləyir!"
  }'
```

**Əgər bu uğurlu olarsa, Telegram-da mesaj görünməlidir. Əgər görünmürsə:**
- Bot token yanlışdır
- Chat ID yanlışdır
- Bot group-a əlavə olunmayıb

### **4. Backend Test (Log-ları İzləyərək):**

**Terminal 1 (Log-ları izləmək):**
```bash
pm2 logs proep-backend --lines 0
```

**Terminal 2 (Appeal yaratmaq):**
```bash
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test3@example.com",
    "phone_number": "+994509998877",
    "appeal": 1,
    "name": "Test User 3",
    "message": "Test message 3 for Telegram"
  }'
```

**Terminal 1-də görməli olduğunuz:**
```
📤 Sending Telegram notification for appeal ID: X
📋 Appeal data: {...}
📨 Telegram payload: {...}
📡 Telegram request sent to: https://api.telegram.org/...
📬 Telegram API response: {"ok":true,"result":{...}}
✅ Telegram notification sent successfully!
```

**Əgər error görürsünüz:**
```
❌ Telegram notification failed: {...}
Və ya
❌ Telegram request error: {...}
```

### **5. Backend Log-larında Error Axtarmaq:**

```bash
# Telegram ilə bağlı log-lar
pm2 logs proep-backend --lines 200 --nostream | grep -i telegram

# Error log-ları
pm2 logs proep-backend --err --lines 100 --nostream

# Bütün log-lar (son 100 sətir)
pm2 logs proep-backend --lines 100 --nostream
```

### **6. Telegram Bot və Chat Yoxlama:**

**Bot token test:**
```bash
# Bot info yoxlama
curl https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/getMe
```

**Chat ID test:**
```bash
# Group chat info yoxlama (əgər bot group-da varsa)
curl https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/getChat?chat_id=-5072517302
```

**Əgər error varsa:**
- Bot group-da yoxdur
- Chat ID yanlışdır
- Bot token yanlışdır

---

## 🔧 Troubleshooting:

### **Problem 1: telegramService.js Serverdə Yoxdur**

**Həll:**
```bash
cd ~/projects/proep/backend
git pull origin main
ls -la src/services/telegramService.js  # Mövcud olmalıdır

# Əgər hələ də yoxdursa, manual yoxlama
ls -la src/
ls -la src/services/
```

### **Problem 2: Import Error**

**Backend log-larında görməli olduğunuz:**
```
Error: Cannot find module '../services/telegramService.js'
```

**Həll:**
```bash
cd ~/projects/proep/backend
git pull origin main
npm install
pm2 restart proep-backend
```

### **Problem 3: Telegram API Error**

**Backend log-larında görməli olduğunuz:**
```
❌ Telegram notification failed: {"ok":false,"error_code":400,"description":"..."}
```

**Ümumi error kodları:**
- `400` - Bad Request (chat_id və ya text yanlışdır)
- `401` - Unauthorized (bot token yanlışdır)
- `403` - Forbidden (bot group-da yoxdur)
- `404` - Not Found (chat_id yanlışdır)

### **Problem 4: Network Error**

**Backend log-larında görməli olduğunuz:**
```
❌ Telegram request error: connect ECONNREFUSED ...
Və ya
❌ Telegram request error: timeout
```

**Həll:**
```bash
# Internet connection yoxlama
ping api.telegram.org

# Telegram API yoxlama
curl https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/getMe
```

---

## 📋 Quick Debug Script:

**Serverdə bu script-i yaradın və işlədin:**

```bash
cat > ~/check-telegram.sh << 'EOF'
#!/bin/bash
echo "🔍 Telegram Notification Debug Check"
echo "====================================="
echo ""

echo "1. Git pull (yeni faylları çəkmək)..."
cd ~/projects/proep/backend
git pull origin main
echo ""

echo "2. telegramService.js mövcuddur?"
ls -la src/services/telegramService.js || echo "❌ Fayl yoxdur!"
echo ""

echo "3. Backend restart..."
pm2 restart proep-backend
sleep 2
echo ""

echo "4. PM2 status:"
pm2 list | grep proep-backend
echo ""

echo "5. Telegram API test (manual):"
curl -s -X POST https://api.telegram.org/bot8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"-5072517302","text":"🧪 Test mesajı - Bot işləyir!"}' | head -5
echo ""

echo "6. Backend log-ları (son 20 sətir):"
pm2 logs proep-backend --lines 20 --nostream | tail -20
echo ""

echo "✅ Debug check completed!"
echo ""
echo "📝 İndi yeni appeal yaradın və log-ları izləyin:"
echo "   pm2 logs proep-backend --lines 0"
echo ""
echo "   curl -X POST http://localhost:3000/api/appeal \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"mail\":\"test@example.com\",\"phone_number\":\"+994501234567\",\"appeal\":1,\"name\":\"Test\",\"message\":\"Test\"}'"
EOF

chmod +x ~/check-telegram.sh
~/check-telegram.sh
```

---

## ✅ Yoxlama Listi:

- [ ] Git pull edildi (telegramService.js mövcuddur)
- [ ] Backend restart edildi (PM2)
- [ ] Telegram API manual test edildi (işləyir?)
- [ ] Backend log-ları yoxlanıldı (error var?)
- [ ] Bot token düzgündür (getMe işləyir?)
- [ ] Chat ID düzgündür (getChat işləyir?)
- [ ] Bot group-da əlavə olunub?
- [ ] Appeal data field-ləri uyğundur (mail, name, etc.)
- [ ] Network connection işləyir (api.telegram.org reachable?)

---

**İndi serverdə bu komandaları işlədin və nəticəni bildirin!**
