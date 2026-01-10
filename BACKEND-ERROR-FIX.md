# Backend Error Fix - Serverdə

## 🔍 Problem Təhlili:

Yoxlama komandalarından görünür ki:
- ✅ PM2 backend işləyir (status: online)
- ✅ Health check uğurlu (database connected)
- ✅ Database connection işləyir
- ❌ **Problem:** `.env` faylında `DB_PASSWORD` yoxdur!

## 🔧 Həll:

### **1. .env Faylına DB_PASSWORD Əlavə Etmək:**

```bash
cd ~/projects/proep/backend

# .env faylını redaktə et
nano .env
```

**.env faylında bu sətirləri əlavə edin:**
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proep
DB_USER=pro
DB_PASSWORD=Projson!

# CORS
FRONTEND_URL=https://proep.az
```

**Və ya bir sətirdə:**
```bash
cd ~/projects/proep/backend
echo "DB_PASSWORD=Projson!" >> .env
```

### **2. Backend Restart:**

```bash
# PM2 restart
pm2 restart proep-backend

# PM2 logs yoxlama
pm2 logs proep-backend --lines 20 --nostream
```

### **3. Error Log-ları Yoxlama:**

```bash
# PM2 error logs
pm2 logs proep-backend --err --lines 50 --nostream

# Əgər error varsa, tam error mesajını görmək
pm2 logs proep-backend --lines 0
```

### **4. Backend Test:**

```bash
# Health check
curl http://localhost:3000/health

# Appeal endpoint test
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message"
  }'
```

---

## 🐛 Əgər Başqa Error Varsa:

### **Error 1: Validation Error (Appeal 1-9)**

Backend validation yeniləndi (1-9), amma database-də constraint yoxdur. Bu problem deyil, amma yoxlamaq lazımdır.

### **Error 2: CORS Error**

Frontend-dən backend-ə sorğu atanda CORS error ola bilər. `.env` faylında `FRONTEND_URL=https://proep.az` olmalıdır.

### **Error 3: Database Connection Pool Error**

Əgər connection pool problemi varsa:
```bash
cd ~/projects/proep/backend
pm2 restart proep-backend
```

---

## 📋 Tam Həll Komandaları:

```bash
# 1. .env faylına DB_PASSWORD əlavə et
cd ~/projects/proep/backend
echo "DB_PASSWORD=Projson!" >> .env

# 2. .env faylını yoxlama
cat .env

# 3. Backend restart
pm2 restart proep-backend

# 4. PM2 logs yoxlama
pm2 logs proep-backend --lines 20 --nostream

# 5. Health check
curl http://localhost:3000/health

# 6. Appeal endpoint test
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message"
  }'
```

---

## ⚠️ Qeyd:

Əgər hansısa xüsusi error mesajı varsa, onu da göndərin. Məsələn:
- Frontend-dən backend-ə sorğu atanda hansı error?
- Browser console-da hansı error?
- Network tab-da hansı error?

Bu məlumatlar daha dəqiq həll tapmağa kömək edəcək.
