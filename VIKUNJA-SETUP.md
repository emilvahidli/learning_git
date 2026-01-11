# Vikunja Setup Guide

Vikunja - Task Management/Project Management alətidir (TaskWarrior və Trello alternativi).

---

## 📋 Məsləhətlərim:

### ✅ **Docker İlə Qaldırmaq (Tövsiyə olunur):**

**Üstünlükləri:**
- ✅ Asan quraşdırma
- ✅ Avtomatik update
- ✅ İzolyasiya (proep.az-dan ayrı)
- ✅ Database və backend özü ilə gəlir
- ✅ Minimal konfiqurasiya

**Mənfi cəhətləri:**
- ❌ Docker quraşdırmaq lazımdır
- ❌ Docker yaddaş istehlak edir

### ⚠️ **Binary İlə Qaldırmaq (Daha çətin):**

**Üstünlükləri:**
- ✅ Docker lazım deyil
- ✅ Daha az yaddaş

**Mənfi cəhətləri:**
- ❌ Daha çətin quraşdırma
- ❌ Manual update
- ❌ Daha çox konfiqurasiya

---

## 🎯 Tövsiyə: Docker İlə Qaldırmaq

**Səbəbi:**
- Serverdə Docker yoxdur, amma quraşdırmaq asandır
- Vikunja Docker image-i rəsmi və well-maintained-dir
- Database və backend özü ilə gəlir (MySQL və ya PostgreSQL)
- Nginx reverse proxy ilə subdomain-də qaldırmaq asandır

---

## 📝 Setup Plan:

### **1. Subdomain Seçimi:**

**Seçimlər:**
- `vikunja.proep.az` ✅ (Tövsiyə olunur)
- `tasks.proep.az`
- `todo.proep.az`

**DNS qeydi:**
```
Type: A
Name: vikunja
Value: 78.46.213.237
TTL: Auto
```

### **2. Docker Quraşdırılması:**

```bash
# Serverə qoşulun
ssh pro@78.46.213.237

# Docker quraşdırın
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose quraşdırın (Vikunja üçün lazımdır)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# User-ə Docker izni verin (sudo olmadan işləsin)
sudo usermod -aG docker pro
# Yeni login session tələb olunur (SSH-dan çıxıb yenidən qoşulun)

# Test edin
docker --version
docker-compose --version
```

### **3. Vikunja Qovluğu Yaradın:**

```bash
mkdir -p ~/projects/vikunja
cd ~/projects/vikunja
```

### **4. Docker Compose Faylı:**

**`docker-compose.yml`:**
```yaml
version: '3'

services:
  vikunja-api:
    image: vikunja/api:latest
    environment:
      VIKUNJA_DATABASE_TYPE: postgres
      VIKUNJA_DATABASE_HOST: db
      VIKUNJA_DATABASE_USER: vikunja
      VIKUNJA_DATABASE_PASSWORD: vikunja_secure_password_change_me
      VIKUNJA_DATABASE_DATABASE: vikunja
      VIKUNJA_SERVICE_PUBLICURL: https://vikunja.proep.az
      VIKUNJA_MAILER_ENABLED: "false"
    volumes:
      - ./files:/app/vikunja/files
    depends_on:
      - db
    restart: unless-stopped

  vikunja-frontend:
    image: vikunja/frontend:latest
    environment:
      API_URL: http://vikunja-api:3456
    depends_on:
      - vikunja-api
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: vikunja
      POSTGRES_PASSWORD: vikunja_secure_password_change_me
      POSTGRES_DB: vikunja
    volumes:
      - ./db:/var/lib/postgresql/data
    restart: unless-stopped
```

**⚠️ Vacib:** `vikunja_secure_password_change_me` şifrəsini dəyişdirin!

### **5. Docker Compose İşə Salın:**

```bash
cd ~/projects/vikunja

# docker-compose.yml yaradın (yuxarıdakı məzmunda)
nano docker-compose.yml

# Şifrələri dəyişdirin
nano docker-compose.yml  # vikunja_secure_password_change_me dəyişdirin

# İşə salın
docker-compose up -d

# Status yoxlayın
docker-compose ps
docker-compose logs -f
```

**Gözləmə:** İlk işə salınmada database migrate olacaq (1-2 dəqiqə).

### **6. Nginx Reverse Proxy:**

**`nginx-vikunja.conf`:**
```nginx
# HTTP server - SSL üçün yönləndirmə
server {
    listen 80;
    listen [::]:80;
    server_name vikunja.proep.az;

    # Let's Encrypt challenge üçün
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # SSL olmayan request-ləri HTTPS-ə yönləndir
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name vikunja.proep.az;

    # SSL sertifikatları (Certbot avtomatik doldurur)
    ssl_certificate /etc/letsencrypt/live/vikunja.proep.az/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vikunja.proep.az/privkey.pem;
    
    # SSL konfiqurasiyası
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Log files
    access_log /var/log/nginx/vikunja-access.log;
    error_log /var/log/nginx/vikunja-error.log;

    # Frontend üçün reverse proxy
    location / {
        proxy_pass http://localhost:3456;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API üçün reverse proxy
    location /api/ {
        proxy_pass http://localhost:3456;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support (real-time features üçün)
    location /ws/ {
        proxy_pass http://localhost:3456;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Nginx Konfiqurasiyası:**

```bash
# Config faylını yaradın
sudo nano /etc/nginx/sites-available/vikunja.proep.az
# (yuxarıdakı nginx-vikunja.conf məzmunu əlavə edin)

# Symlink yaradın
sudo ln -s /etc/nginx/sites-available/vikunja.proep.az /etc/nginx/sites-enabled/

# Test edin
sudo nginx -t

# Reload edin
sudo systemctl reload nginx
```

### **7. SSL Sertifikatı (DNS propagasiya olduqdan sonra):**

```bash
# SSL sertifikatı alın
sudo certbot --nginx -d vikunja.proep.az

# Avtomatik yenilənmə test edin
sudo certbot renew --dry-run
```

### **8. Firewall (Port açmaq lazım deyil - Nginx proxy edir):**

Port 3456 firewall-da açıq olmalıdır (local-dan):
```bash
# Yoxlayın (port açıq olmalıdır)
sudo ufw status

# Əgər lazımdırsa:
sudo ufw allow from 127.0.0.1 to any port 3456
```

### **9. Vikunja İlk Konfiqurasiyası:**

1. **Browser-də açın:** `https://vikunja.proep.az`
2. **İlk user yaradın** (admin olacaq)
3. **İstədiyiniz parametrləri təyin edin**

---

## 📊 Server Resursları:

### **Vikunja Minimum Tələbləri:**

- **RAM:** 512 MB (recommended: 1 GB)
- **Disk:** 1 GB (database və files üçün)
- **CPU:** 1 core

### **Proep.az + Vikunja Ümumi:**

- **RAM:** 
  - Proep.az (Node.js backend): ~100 MB
  - Vikunja: ~300-500 MB
  - PostgreSQL: ~100 MB
  - Nginx: ~50 MB
  - **Ümumi:** ~1 GB (recommended: 2 GB)

- **Disk:**
  - Proep.az: ~500 MB
  - Vikunja: ~1 GB
  - **Ümumi:** ~2 GB (recommended: 5 GB)

---

## 🔧 Management Komandaları:

### **Vikunja İşə Salmaq/Durdurmaq:**

```bash
cd ~/projects/vikunja

# İşə sal
docker-compose up -d

# Durdur
docker-compose stop

# Dayandır və container-ləri sil
docker-compose down

# Yenidən işə sal
docker-compose restart

# Log-ları görmək
docker-compose logs -f

# Yalnız API log-ları
docker-compose logs -f vikunja-api

# Status
docker-compose ps
```

### **Backup:**

```bash
# Database backup
cd ~/projects/vikunja
docker-compose exec db pg_dump -U vikunja vikunja > backup-$(date +%Y%m%d).sql

# Files backup
tar -czf vikunja-files-$(date +%Y%m%d).tar.gz files/

# Hər ikisini backup et
mkdir -p ~/backups/vikunja
docker-compose exec db pg_dump -U vikunja vikunja > ~/backups/vikunja/db-$(date +%Y%m%d).sql
tar -czf ~/backups/vikunja/files-$(date +%Y%m%d).tar.gz files/
```

### **Update:**

```bash
cd ~/projects/vikunja

# Yeni image-ləri çək
docker-compose pull

# Container-ləri yenilə
docker-compose up -d

# Köhnə image-ləri sil (disk yerini təmizlə)
docker image prune -a
```

---

## 🐛 Troubleshooting:

### **Vikunja açılmır:**

```bash
# Container status
docker-compose ps

# Log-ları yoxlayın
docker-compose logs

# Database connection problemi?
docker-compose logs db
docker-compose logs vikunja-api

# Nginx proxy problemi?
sudo tail -f /var/log/nginx/vikunja-error.log
sudo nginx -t
```

### **Port conflict:**

```bash
# Port 3456 istifadə olunur?
sudo netstat -tulpn | grep 3456

# Docker container port-larını yoxlayın
docker-compose ps
```

### **Permission problemi:**

```bash
# Files qovluğuna izin verin
sudo chown -R pro:pro ~/projects/vikunja/files
sudo chmod -R 755 ~/projects/vikunja/files
```

---

## 📚 Əlavə Məlumat:

### **Vikunja Xüsusiyyətləri:**

- ✅ Tasks və Projects
- ✅ Kanban boards
- ✅ Gantt charts
- ✅ Calendar view
- ✅ Team collaboration
- ✅ File attachments
- ✅ Comments və Labels
- ✅ API və Mobile apps

### **Rəsmi Sənədlər:**

- **Docker:** https://vikunja.io/docs/docker/
- **Installation:** https://vikunja.io/docs/installation/
- **Configuration:** https://vikunja.io/docs/config/

---

## ✅ Nəticə:

**Vikunja Docker ilə qaldırıldıqdan sonra:**
- ✅ `https://vikunja.proep.az` - Vikunja frontend
- ✅ `https://vikunja.proep.az/api/` - Vikunja API
- ✅ Database: PostgreSQL (Vikunja öz database-ini yaradır)
- ✅ Files: `~/projects/vikunja/files/`
- ✅ Backup: Database və files backup edilə bilər

**Proep.az ilə birlikdə işləyir:**
- ✅ Proep.az: `https://proep.az` (Port 3000 backend)
- ✅ Vikunja: `https://vikunja.proep.az` (Port 3456 Docker)
- ✅ İkisi də Nginx reverse proxy ilə işləyir
- ✅ Hər ikisi SSL ilə qorunur

---

**Hazırdır! Vikunja istifadəyə hazırdır!** 🎉
