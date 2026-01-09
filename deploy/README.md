# Proep.az Server Deployment Guide

## Server Hazırlığı

### 1. Server Setup Script-i İşlədin

```bash
# Local-dan serverə qoşulun
ssh pro@your-server-ip

# Script-i serverə kopyalayın və işlədin
chmod +x server-setup.sh
./server-setup.sh
```

Bu script:
- System update edir
- Nginx quraşdırır
- Node.js 20.x quraşdırır
- PM2 quraşdırır (backend üçün)
- Certbot quraşdırır (SSL üçün)
- Firewall konfiqurasiya edir

### 2. Domain DNS Qeydləri

Domain provider-də (məsələn: Namecheap, GoDaddy) aşağıdakı DNS qeydlərini əlavə edin:

```
A Record:     @     ->  server-ip
A Record:     www   ->  server-ip
```

DNS propagasiya üçün 5-30 dəqiqə gözləyin.

### 3. Nginx Konfiqurasiyası

```bash
# Nginx config faylını kopyalayın
sudo cp nginx-proep.conf /etc/nginx/sites-available/proep.az

# Domain adını dəyişdirin (əgər fərqlidirsə)
sudo nano /etc/nginx/sites-available/proep.az

# Symlink yaradın
sudo ln -s /etc/nginx/sites-available/proep.az /etc/nginx/sites-enabled/

# Test edin
sudo nginx -t

# Nginx reload
sudo systemctl reload nginx
```

### 4. SSL Sertifikatı (Let's Encrypt)

```bash
# SSL sertifikatı alın
sudo certbot --nginx -d proep.az -d www.proep.az

# Avtomatik yenilənmə test edin
sudo certbot renew --dry-run
```

Certbot avtomatik olaraq Nginx konfiqurasiyasını yeniləyəcək.

### 5. Firewall Status

```bash
# Firewall status
sudo ufw status

# Portlar açıqdır:
# - 22 (SSH)
# - 80 (HTTP)
# - 443 (HTTPS)
```

## Frontend Deploy

### Metod 1: Deploy Script (Tövsiyə olunur)

```bash
# Local-dan
cd /Users/emil.vahidli/Projects/proep
chmod +x deploy/deploy.sh

# deploy.sh faylında SERVER_HOST dəyişdirin
nano deploy/deploy.sh

# Deploy edin
./deploy/deploy.sh
```

### Metod 2: Manual Deploy

```bash
# Local-dan build edin
cd frontend
npm run build

# Serverə yükləyin
rsync -avz --delete dist/ pro@server-ip:/home/pro/projects/proep/frontend/dist/

# Serverdə Nginx reload
ssh pro@server-ip "sudo systemctl reload nginx"
```

### Metod 3: Git + Server Hook

```bash
# Serverdə
cd ~/projects/proep
git clone your-repo-url .

# Deploy script yaradın
nano ~/projects/proep/deploy-hook.sh
```

```bash
#!/bin/bash
cd ~/projects/proep/frontend
git pull
npm install
npm run build
sudo systemctl reload nginx
```

## Backend Deploy (Əgər varsa)

### PM2 ilə

```bash
# Serverdə
cd ~/projects/proep/backend
npm install
pm2 start src/server.js --name proep-backend
pm2 save
```

### PM2 Komandaları

```bash
pm2 list              # Status
pm2 logs proep-backend # Loglar
pm2 restart proep-backend # Restart
pm2 stop proep-backend    # Stop
```

## Monitoring və Logs

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/proep-access.log

# Error logs
sudo tail -f /var/log/nginx/proep-error.log
```

### System Status

```bash
# Nginx status
sudo systemctl status nginx

# PM2 status (backend üçün)
pm2 status

# Disk usage
df -h

# Memory
free -h
```

## Troubleshooting

### Nginx Error

```bash
# Test konfiqurasiya
sudo nginx -t

# Error log
sudo tail -50 /var/log/nginx/error.log
```

### SSL Problem

```bash
# Certbot status
sudo certbot certificates

# Manual renew
sudo certbot renew
```

### Permission Problem

```bash
# Nginx user-ə permission verin
sudo chown -R www-data:www-data /home/pro/projects/proep/frontend/dist
sudo chmod -R 755 /home/pro/projects/proep/frontend/dist
```

## Security Checklist

- [ ] SSH key authentication (password deyil)
- [ ] Firewall aktivdir
- [ ] SSL sertifikatı quraşdırılıb
- [ ] Nginx security headers aktivdir
- [ ] Regular updates
- [ ] Backups konfiqurasiya edilib

## Backup

```bash
# Frontend backup
tar -czf backup-frontend-$(date +%Y%m%d).tar.gz ~/projects/proep/frontend/dist

# Cron job (həftəlik backup)
0 2 * * 0 tar -czf /home/pro/backups/frontend-$(date +\%Y\%m\%d).tar.gz /home/pro/projects/proep/frontend/dist
```
