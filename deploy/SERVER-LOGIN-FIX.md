# Server Login Problemi - Həll

## Problem
Serverdə admin panel-ə login olunmur, düzgün username və şifrə ilə də girmir.

## Həll Addımları

### 1. Serverdə Admin User Yarat/Yenilə

```bash
# Server-ə bağlan
ssh user@your-server-ip

# Project qovluğuna get
cd /home/pro/projects/proep

# Git pull et
git pull origin main

# Backend qovluğuna get
cd backend

# Admin user yarat/yenilə
npm run create-admin
```

Bu əmr admin user-in mövcud olduğunu yoxlayır və şifrəni yeniləyir.

### 2. Database-də Admin User-i Yoxla

```bash
# PostgreSQL-ə bağlan
psql -U pro -d proep

# Admin user-ləri gör
SELECT id, username, is_active, role, created_at FROM admin_users;

# Şifrə hash-ini gör (test üçün)
SELECT username, LEFT(password_hash, 20) as hash_preview FROM admin_users;

# Çıxış
\q
```

### 3. Backend Loglarını Yoxla

```bash
# PM2 loglarını gör
pm2 logs proep-backend

# Və ya son 100 sətir
pm2 logs proep-backend --lines 100
```

### 4. API URL Konfiqurasiyasını Yoxla

Admin panel-də API URL-in düzgün olduğunu yoxlayın:

**Production üçün:**
- `VITE_API_URL=https://proep.az` (və ya backend URL)

**Local development üçün:**
- `VITE_API_URL=http://localhost:3000`

### 5. CORS Problemini Yoxla

Backend-də `server.js` faylında CORS konfiqurasiyası:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://proep.az', 'https://admin.proep.az']  // Hər iki domain
    : true,
  credentials: true,
}));
```

### 6. Admin Panel Build və Deploy

```bash
# Admin panel build et
cd /home/pro/projects/proep/admin-panel
npm install
npm run build

# Build-in düzgün olduğunu yoxla
ls -la dist/
```

### 7. Nginx Konfiqurasiyasını Yoxla

```bash
# Nginx konfiqurasiyasını test et
sudo nginx -t

# Nginx reload et
sudo systemctl reload nginx

# Nginx loglarını yoxla
sudo tail -f /var/log/nginx/admin-proep-error.log
```

### 8. Browser Console-da Xəta Yoxla

Browser-də `F12` basın və Console-da xətaları yoxlayın:
- Network tab-da login request-ini yoxlayın
- Response-u yoxlayın
- CORS xətası varmı?

### 9. Test Login Request

```bash
# Curl ilə test et
curl -X POST https://proep.az/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emil.vahidli","password":"Projson!"}'
```

### 10. Əgər Hələ də Problem Varsa

1. **Database connection yoxla:**
```bash
cd backend
node -e "import('./src/config/database.js').then(m => m.default.query('SELECT NOW()').then(r => console.log('OK:', r.rows[0])).catch(e => console.error('ERROR:', e)))"
```

2. **Backend restart et:**
```bash
pm2 restart proep-backend
pm2 logs proep-backend --lines 50
```

3. **Environment variables yoxla:**
```bash
cd backend
cat .env | grep -E "DB_|JWT_|NODE_ENV"
```

## Əsas Problemlər və Həlləri

### Problem 1: Admin user yoxdur
**Həll:** `npm run create-admin` işlədin

### Problem 2: Şifrə hash-i yanlışdır
**Həll:** `npm run create-admin` şifrəni yeniləyir

### Problem 3: CORS xətası
**Həll:** Backend-də CORS konfiqurasiyasını yeniləyin

### Problem 4: API URL yanlışdır
**Həll:** Admin panel-də `.env` faylında `VITE_API_URL` düzgün olmalıdır

### Problem 5: Database connection problemi
**Həll:** `.env` faylında database credentials düzgün olmalıdır
