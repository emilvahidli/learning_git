# Proep.az Deployment Guide

## Server IP
**78.46.213.237**

## GitHub
**Username:** emilvahidli  
**Repo:** https://github.com/emilvahidli/proep

---

## 1. Local-dan GitHub-a Push

```bash
# Git init (əgər yoxdursa)
git init
git remote add origin https://github.com/emilvahidli/proep.git

# Commit və push
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## 2. Serverdə İlkin Quraşdırma

### A. Server Setup (bir dəfə)

```bash
# Local-dan serverə qoşulun
ssh pro@78.46.213.237

# Setup script-i kopyalayın və işlədin
# (Local terminal-də)
scp deploy/server-setup.sh pro@78.46.213.237:~/

# Serverdə
chmod +x server-setup.sh
./server-setup.sh
```

### B. Git Setup (bir dəfə)

```bash
# Serverdə
# Git setup script-i kopyalayın
scp deploy/server-git-setup.sh pro@78.46.213.237:~/

# Serverdə işlədin
chmod +x server-git-setup.sh
./server-git-setup.sh
```

Bu script:
- GitHub repo-nu clone edir
- Dependencies install edir
- Nginx konfiqurasiya edir

---

## 3. Domain DNS Qeydləri

Domain provider-də (proep.az):

```
A Record:  @   ->  78.46.213.237
A Record:  www ->  78.46.213.237
```

DNS propagasiya: 5-30 dəqiqə

---

## 4. SSL Sertifikatı

```bash
# Serverdə
sudo certbot --nginx -d proep.az -d www.proep.az
```

---

## 5. Deploy Metodları

### Metod 1: Manual Deploy (Serverdə)

```bash
# Serverdə
cd /home/pro/projects/proep
./deploy/git-deploy.sh
```

Bu script:
- Git pull edir
- Frontend build edir
- Nginx reload edir

### Metod 2: GitHub Actions (Avtomatik)

GitHub Actions istifadə etmək üçün:

1. **GitHub Secrets əlavə edin:**
   - Settings → Secrets and variables → Actions
   - Aşağıdakı secrets əlavə edin:
     - `SERVER_HOST`: `78.46.213.237`
     - `SERVER_USER`: `pro`
     - `SSH_PRIVATE_KEY`: Server SSH private key

2. **SSH Key yaradın:**
   ```bash
   # Local-dan
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
   
   # Public key-i serverə əlavə edin
   ssh-copy-id -i ~/.ssh/github_actions.pub pro@78.46.213.237
   
   # Private key-i GitHub Secrets-a əlavə edin
   cat ~/.ssh/github_actions
   ```

3. **Push edin:**
   ```bash
   git push origin main
   ```
   
   GitHub Actions avtomatik deploy edəcək!

### Metod 3: Local-dan Deploy Script

```bash
# Local-dan
cd /Users/emil.vahidli/Projects/proep

# Deploy script yaradın
cat > deploy-local.sh << 'EOF'
#!/bin/bash
cd frontend
npm run build
rsync -avz --delete dist/ pro@78.46.213.237:/home/pro/projects/proep/frontend/dist/
ssh pro@78.46.213.237 "cd /home/pro/projects/proep && ./deploy/git-deploy.sh"
EOF

chmod +x deploy-local.sh
./deploy-local.sh
```

---

## 6. Nginx Konfiqurasiyası

```bash
# Serverdə
sudo nano /etc/nginx/sites-available/proep.az

# Domain adını yoxlayın (proep.az)
# Root path: /home/pro/projects/proep/frontend/dist

# Test və reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Monitoring

### Logs

```bash
# Nginx access log
sudo tail -f /var/log/nginx/proep-access.log

# Nginx error log
sudo tail -f /var/log/nginx/proep-error.log

# PM2 logs (backend üçün)
pm2 logs proep-backend
```

### Status

```bash
# Nginx status
sudo systemctl status nginx

# PM2 status
pm2 status

# Disk usage
df -h
```

---

## 8. Troubleshooting

### Git Pull Problem

```bash
# Serverdə
cd /home/pro/projects/proep
git status
git pull origin main
```

### Build Problem

```bash
# Serverdə
cd /home/pro/projects/proep/frontend
rm -rf node_modules dist
npm install
npm run build
```

### Nginx Problem

```bash
# Test
sudo nginx -t

# Error log
sudo tail -50 /var/log/nginx/error.log

# Restart
sudo systemctl restart nginx
```

### Permission Problem

```bash
# Nginx user-ə permission
sudo chown -R pro:pro /home/pro/projects/proep
sudo chmod -R 755 /home/pro/projects/proep/frontend/dist
```

---

## 9. Quick Deploy

Ən sürətli yol:

```bash
# Local-dan
git add .
git commit -m "Update"
git push origin main

# Serverdə
ssh pro@78.46.213.237 "cd /home/pro/projects/proep && ./deploy/git-deploy.sh"
```

Və ya GitHub Actions istifadə edin - avtomatik olacaq!
