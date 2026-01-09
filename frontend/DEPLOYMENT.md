# Production Deployment Guide

## Environment Variables

Production üçün aşağıdakı environment variables-ları təyin etməlisiniz:

### `.env.production` faylı yaradın:

```env
# API Configuration
VITE_API_BASE_URL=https://api.proep.az/api
VITE_API_TIMEOUT=30000

# Site Configuration
VITE_SITE_URL=https://proep.az
VITE_SITE_NAME=Proep.az

# Environment
VITE_ENV=production

# Contact Form
VITE_CONTACT_EMAIL=hello@proep.az
VITE_CONTACT_PHONE=+994501234567
```

### Development üçün `.env.development`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Site Configuration
VITE_SITE_URL=http://localhost:5173
VITE_SITE_NAME=Proep.az

# Environment
VITE_ENV=development

# Contact Form
VITE_CONTACT_EMAIL=hello@proep.az
VITE_CONTACT_PHONE=+994501234567
```

## Build Process

### 1. Production Build

```bash
npm run build
```

Bu komanda `dist/` qovluğunda production-ready fayllar yaradacaq.

### 2. Build Output

- `dist/index.html` - Ana HTML faylı
- `dist/assets/` - CSS, JS və digər asset faylları
- Bütün fayllar minify və optimize edilmişdir

### 3. Preview Build (Test)

```bash
npm run build
npm run preview
```

Bu, production build-i local-da test etmək üçündür.

## Vite Configuration

`vite.config.ts` faylında aşağıdakı konfiqurasiyalar var:

### Base Path

Əgər sayt subdirectory-də deploy olunursa (məsələn: `proep.az/subfolder/`):

```typescript
base: '/subfolder/',
```

Root domain üçün:
```typescript
base: '/',
```

### Build Optimizations

- **Minification**: Terser istifadə olunur
- **Console logs**: Production-da silinir
- **Code splitting**: React və Motion ayrı chunk-lara bölünür
- **Source maps**: Production-da kapalıdır (performans üçün)

## Server Configuration

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name proep.az www.proep.az;
    
    root /var/www/proep.az/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    
    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing - bütün request-ləri index.html-ə yönləndir
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Apache Configuration Example

`.htaccess` faylı `dist/` qovluğuna əlavə edin:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
</IfModule>
```

## Important Notes

### 1. Environment Variables

- Vite environment variables `VITE_` prefix ilə başlamalıdır
- Build zamanı environment variables build-ə daxil edilir
- `.env.production` faylı production build üçün istifadə olunur

### 2. API Endpoints

Backend API URL-ləri `src/config/env.ts` faylında konfiqurasiya edilir:

```typescript
import { config } from './config/env';

// API çağırışı üçün
fetch(`${config.api.baseUrl}/endpoint`)
```

### 3. Router Base Path

React Router base path-i avtomatik olaraq Vite `base` konfiqurasiyasından götürür. Əlavə konfiqurasiya lazım deyil.

### 4. HTTPS

Production-da HTTPS istifadə etməyi unutmayın. Let's Encrypt istifadə edə bilərsiniz.

### 5. CDN (Optional)

Static asset-ləri CDN-də host edə bilərsiniz (Cloudflare, AWS CloudFront, və s.)

## Deployment Checklist

- [ ] `.env.production` faylı yaradılıb və doldurulub
- [ ] `VITE_API_BASE_URL` production backend URL-ə dəyişdirilib
- [ ] `VITE_SITE_URL` production domain-ə dəyişdirilib
- [ ] `npm run build` komandası işlədilib
- [ ] `dist/` qovluğu serverə yüklənib
- [ ] Server konfiqurasiyası (Nginx/Apache) düzgün quraşdırılıb
- [ ] HTTPS sertifikatı quraşdırılıb
- [ ] DNS qeydləri düzgün konfiqurasiya edilib
- [ ] Test edilib: `/home/az`, `/home/en` və digər route-lar işləyir
- [ ] Contact form backend-ə bağlanıb (əgər varsa)

## Troubleshooting

### 404 Error on Refresh

SPA routing problemi. Server konfiqurasiyasında bütün request-ləri `index.html`-ə yönləndirməyi yoxlayın.

### Assets Not Loading

`vite.config.ts`-də `base` path-i yoxlayın. Əgər subdirectory-də deploy edirsinizsə, base path-i düzgün təyin edin.

### API Calls Failing

- CORS konfiqurasiyasını yoxlayın
- `VITE_API_BASE_URL` düzgün təyin edilibmi yoxlayın
- Network tab-da request URL-ləri yoxlayın
