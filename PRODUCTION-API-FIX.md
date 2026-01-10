# Production API Connection Fix

## 🔍 Problem:

Frontend production-da `https://proep.az` üzərində işləyir, amma backend API sorğusu `http://localhost:3000` istifadə edir. Browser localhost-a connection qura bilmir çünki frontend başqa serverdədir.

**Error:**
```
POST http://localhost:3000/api/appeal net::ERR_CONNECTION_REFUSED
```

## ✅ Həll:

İki yol var:
1. **Nginx Reverse Proxy** (Tövsiyə olunur - eyni domain-də işləyir)
2. **Frontend Environment Variable** (API URL-i production üçün dəyişdirmək)

---

## 🔧 Metod 1: Nginx Reverse Proxy (Tövsiyə Olunur)

### **1. Nginx Config Yeniləmək:**

**Serverdə:**
```bash
sudo nano /etc/nginx/sites-available/proep.az
```

**Nginx config-ə bu sətirləri əlavə edin (location /api və location /health):**
```nginx
# API proxy (backend üçün)
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Health check endpoint (backend üçün)
location /health {
    proxy_pass http://localhost:3000/health;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### **2. Nginx Test və Reload:**

```bash
# Nginx config test
sudo nginx -t

# Əgər uğurludursa, reload
sudo systemctl reload nginx
```

### **3. Frontend Build Yeniləmək:**

**Local-dan:**
```bash
cd frontend
npm run build
git add dist/
git commit -m "Update frontend build with production API config"
git push origin main
```

**Serverdə:**
```bash
cd ~/projects/proep
git pull origin main

cd frontend
npm run build

# Frontend files copy (əgər /var/www/proep.az istifadə edirsinizsə)
sudo cp -r dist/* /var/www/proep.az/
sudo chown -R www-data:www-data /var/www/proep.az
sudo chmod -R 755 /var/www/proep.az

# Və ya Nginx config-də root path yoxlama
```

### **4. Test:**

```bash
# Backend health check (Nginx üzərindən)
curl https://proep.az/health

# API endpoint test (Nginx üzərindən)
curl -X POST https://proep.az/api/appeal \
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

## 🔧 Metod 2: Frontend Environment Variable

### **1. Production Environment Variable:**

**Serverdə frontend build zamanı:**
```bash
cd ~/projects/proep/frontend

# Production build environment variable ilə
VITE_API_URL=https://proep.az npm run build
```

**Və ya `.env.production` faylı yaradın:**
```bash
cd ~/projects/proep/frontend
nano .env.production
```

**.env.production:**
```env
VITE_API_URL=https://proep.az
```

**Build:**
```bash
npm run build
```

### **2. Backend CORS Update:**

**Backend `.env` faylında:**
```env
FRONTEND_URL=https://proep.az
```

**Backend restart:**
```bash
pm2 restart proep-backend
```

---

## 🎯 Tövsiyə Olunan Həll: Nginx Reverse Proxy

**Niyə?**
- Eyni domain-də işləyir (`https://proep.az/api`)
- CORS problemi olmaz
- Daha təhlükəsiz (backend port açıq deyil)
- Daha asan konfiqurasiya

**Addımlar:**
1. Nginx config-ə `/api` location əlavə et
2. Nginx reload et
3. Frontend build yenilə (artıq edilib)
4. Test et

---

## 📋 Quick Fix Commands:

**Serverdə:**

```bash
# 1. Nginx config redaktə et
sudo nano /etc/nginx/sites-available/proep.az

# 2. Location /api və /health əlavə et (yuxarıdakı kodu)

# 3. Nginx test və reload
sudo nginx -t
sudo systemctl reload nginx

# 4. Frontend build yenilə
cd ~/projects/proep/frontend
npm run build

# 5. Test
curl https://proep.az/health
curl -X POST https://proep.az/api/appeal \
  -H "Content-Type: application/json" \
  -d '{"mail":"test@example.com","phone_number":"+994501234567","appeal":1,"name":"Test","message":"Test"}'
```

---

## ✅ Yoxlama:

1. Browser-də `https://proep.az/contact/az` açın
2. Form-u doldurun və göndərin
3. Network tab-da `https://proep.az/api/appeal` sorğusu görünməlidir
4. Error olmamalıdır (ERR_CONNECTION_REFUSED)

---

**İndi Nginx config-i yeniləyin və test edin!**
