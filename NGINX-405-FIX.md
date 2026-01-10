# Nginx 405 Method Not Allowed Fix

## 🔍 Problem:

Nginx 405 (Method Not Allowed) error verir. Bu o deməkdir ki:
- Nginx config-də `/api` location düzgün konfiqurasiya edilməyib
- Və ya Nginx config reload olunmayıb
- Və ya `/api` location backend-ə yönləndirilmir

**Error:**
```
POST https://proep.az/api/appeal 405 (Method Not Allowed)
```

## ✅ Həll:

### **1. Nginx Config Yoxlama:**

**Serverdə:**
```bash
ssh pro@78.46.213.237
sudo nano /etc/nginx/sites-available/proep.az
```

### **2. Nginx Config-də `/api` Location Əlavə Etmək:**

**Nginx config-də HTTPS server block-da (location /-dən sonra) bu sətirləri əlavə edin:**

```nginx
# API proxy (backend üçün) - location /-dən ƏVVƏL olmalıdır!
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
    
    # CORS headers (əgər backend-də yoxdursa)
    add_header Access-Control-Allow-Origin $http_origin always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
    add_header Access-Control-Allow-Credentials "true" always;
    
    # OPTIONS request handle (preflight)
    if ($request_method = OPTIONS) {
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Access-Control-Allow-Credentials "true" always;
        add_header Content-Length 0;
        add_header Content-Type text/plain;
        return 204;
    }
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

**⚠️ Vacib:** `location /api` **location /**-dən **ƏVVƏL** olmalıdır! Çünki Nginx location-ləri specific-dən general-a doğru yoxlayır.

### **3. Tam Nginx Config (HTTPS server block):**

```nginx
# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name proep.az www.proep.az;

    # SSL sertifikatları
    ssl_certificate /etc/letsencrypt/live/proep.az/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proep.az/privkey.pem;
    
    # SSL konfiqurasiyası
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Root directory - frontend build
    root /home/pro/projects/proep/frontend/dist;
    index index.html;

    # Log files
    access_log /var/log/nginx/proep-access.log;
    error_log /var/log/nginx/proep-error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/x-javascript
        image/svg+xml;

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API proxy (backend üçün) - location /-dən ƏVVƏL!
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
    
    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA routing - bütün request-ləri index.html-ə yönləndir
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### **4. Nginx Test və Reload:**

```bash
# Nginx config test
sudo nginx -t

# Əgər uğurludursa, reload
sudo systemctl reload nginx

# Və ya restart (əgər reload işləmirsə)
sudo systemctl restart nginx
```

### **5. Backend Yoxlama:**

```bash
# Backend işləyir?
pm2 list | grep proep-backend

# Backend localhost-da işləyir?
curl http://localhost:3000/health

# Backend appeal endpoint test (localhost-da)
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

### **6. Nginx Üzərindən Test:**

```bash
# Health check (Nginx üzərindən)
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

## 🔧 Troubleshooting:

### **Error: 405 Method Not Allowed**

1. **Nginx config-də `/api` location mövcuddur?**
   ```bash
   sudo grep -n "location /api" /etc/nginx/sites-available/proep.az
   ```

2. **`location /api` `location /`-dən ƏVVƏL-dir?**
   ```bash
   sudo cat /etc/nginx/sites-available/proep.az | grep -A 10 "location /api"
   ```

3. **Nginx config reload olunub?**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

### **Error: 502 Bad Gateway**

Backend işləmir. Yoxlama:
```bash
pm2 list
curl http://localhost:3000/health
```

### **Error: 404 Not Found**

Backend route mövcud deyil. Yoxlama:
```bash
curl http://localhost:3000/api/appeal
```

---

## 📋 Quick Fix Commands:

**Serverdə:**

```bash
# 1. Nginx config yoxlama
sudo cat /etc/nginx/sites-available/proep.az | grep -A 15 "location /api"

# 2. Əgər /api location yoxdursa, əlavə et
sudo nano /etc/nginx/sites-available/proep.az

# 3. Nginx test və reload
sudo nginx -t && sudo systemctl reload nginx

# 4. Backend yoxlama
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/appeal -H "Content-Type: application/json" -d '{"mail":"test@example.com","phone_number":"+994501234567","appeal":1,"name":"Test","message":"Test"}'

# 5. Nginx üzərindən test
curl https://proep.az/health
curl -X POST https://proep.az/api/appeal -H "Content-Type: application/json" -d '{"mail":"test@example.com","phone_number":"+994501234567","appeal":1,"name":"Test","message":"Test"}'
```

---

## ✅ Yoxlama:

1. Nginx config-də `location /api` mövcuddur və `location /`-dən əvvəldir
2. Nginx reload olunub
3. Backend localhost-da işləyir
4. Nginx üzərindən `/api/appeal` endpoint işləyir
5. Browser-də form göndərildikdə 405 error yoxdur

**İndi bu addımları işlədin və nəticəni bildirin!**
