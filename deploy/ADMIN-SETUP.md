# Admin Panel Setup - admin.proep.az

## Problem
`admin.proep.az` səhifəsinə girəndə `proep.az` açılırdı, çünki Nginx konfiqurasiyasında admin subdomain üçün ayrı server block yox idi.

## Həll
Nginx konfiqurasiyasına `admin.proep.az` üçün ayrı server block əlavə edildi.

## Serverdə tətbiq etmək

### 1. Nginx konfiqurasiyasını yeniləyin

```bash
# Server-ə bağlanın
ssh user@your-server-ip

# Nginx konfiqurasiyasını yeniləyin
cd /home/pro/projects/proep
git pull origin main

# Nginx konfiqurasiyasını kopyalayın
sudo cp deploy/nginx-proep.conf /etc/nginx/sites-available/proep.az

# Nginx test edin
sudo nginx -t

# Nginx reload edin
sudo systemctl reload nginx
```

### 2. Admin panel build edin

```bash
cd /home/pro/projects/proep/admin-panel
npm install
npm run build
```

### 3. SSL sertifikatını yeniləyin (əgər lazımsa)

```bash
# admin.proep.az üçün SSL sertifikatı əlavə edin
sudo certbot --nginx -d admin.proep.az

# Və ya mövcud sertifikatı yeniləyin
sudo certbot renew
```

### 4. DNS qeydini yoxlayın

DNS-də `admin.proep.az` üçün A record olmalıdır:
```
admin.proep.az  A  your-server-ip
```

## Test

1. `https://admin.proep.az` - Admin panel açılmalıdır
2. `https://proep.az` - Əsas sayt açılmalıdır

## Qeyd

- Admin panel build path: `/home/pro/projects/proep/admin-panel/dist`
- Frontend build path: `/home/pro/projects/proep/frontend/dist`
- Backend API: `http://localhost:3000` (hər ikisi üçün `/api` endpoint ilə)
