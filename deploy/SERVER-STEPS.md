# Serverdə Etməli Olduğunuz İşlər (Sıra ilə)

## Server IP: 78.46.213.237
## User: pro

---

## 1. Serverə Qoşulun

```bash
ssh pro@78.46.213.237
```

---

## 2. System Update və Əsas Paketlər

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl wget git build-essential software-properties-common
```

---

## 3. Nginx Quraşdırılması

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

---

## 4. Node.js 20.x Quraşdırılması

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

---

## 5. PM2 Quraşdırılması (Backend üçün)

```bash
sudo npm install -g pm2
pm2 startup systemd -u pro --hp /home/pro
```

---

## 6. Certbot Quraşdırılması (SSL üçün)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## 7. Firewall Konfiqurasiyası

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

---

## 8. Proyekt Qovluğu Yaradın

```bash
mkdir -p ~/projects/proep
cd ~/projects/proep
```

---

## 9. Git Repo Clone Edin

```bash
git clone https://github.com/emilvahidli/proep.git .
```

---

## 10. Deploy Script-ləri Executable Edin

```bash
chmod +x deploy/*.sh
```

---

## 11. Frontend Dependencies Install

```bash
cd ~/projects/proep/frontend
npm install
cd ~/projects/proep
```

---

## 12. Nginx Konfiqurasiyası

```bash
# Config faylını kopyalayın
sudo cp ~/projects/proep/deploy/nginx-proep.conf /etc/nginx/sites-available/proep.az

# Domain adını yoxlayın (proep.az düzgündürsə dəyişdirməyin)
sudo nano /etc/nginx/sites-available/proep.az

# Symlink yaradın
sudo ln -s /etc/nginx/sites-available/proep.az /etc/nginx/sites-enabled/

# Default Nginx config-i silin (əgər varsa)
sudo rm -f /etc/nginx/sites-enabled/default

# Test edin
sudo nginx -t

# Əgər test uğurlu oldusa, reload edin
sudo systemctl reload nginx
```

---

## 13. Domain DNS Qeydləri (Domain Provider-də)

Domain provider-də (proep.az üçün) aşağıdakı qeydləri əlavə edin:

```
Type: A
Name: @
Value: 78.46.213.237
TTL: Auto

Type: A
Name: www
Value: 78.46.213.237
TTL: Auto
```

DNS propagasiya: 5-30 dəqiqə gözləyin.

DNS yoxlamaq üçün:
```bash
dig proep.az
# və ya
nslookup proep.az
```

---

## 14. SSL Sertifikatı (DNS propagasiya olduqdan sonra)

```bash
sudo certbot --nginx -d proep.az -d www.proep.az
```

Certbot soruşacaq:
- Email daxil edin
- Terms of Service qəbul edin (A)
- Email paylaşmaq istəyirsiniz? (N)

Certbot avtomatik olaraq Nginx config-ini yeniləyəcək.

---

## 15. İlk Deploy

```bash
cd ~/projects/proep
./deploy/git-deploy.sh
```

Bu script:
- Git pull edir
- Frontend build edir
- Nginx reload edir

---

## 16. Yoxlama

```bash
# Nginx status
sudo systemctl status nginx

# Site açılır?
curl -I https://proep.az

# Logs
sudo tail -f /var/log/nginx/proep-access.log
```

---

## ✅ Hazırdır!

İndi https://proep.az açılmalıdır.

---

## Növbəti Deploy-lər

Hər dəfə deploy etmək üçün:

```bash
cd ~/projects/proep
./deploy/git-deploy.sh
```

Və ya GitHub Actions istifadə edin (avtomatik).

---

## Troubleshooting

### Nginx Error

```bash
sudo nginx -t
sudo tail -50 /var/log/nginx/error.log
```

### Permission Problem

```bash
sudo chown -R pro:pro ~/projects/proep
sudo chmod -R 755 ~/projects/proep/frontend/dist
```

### Build Problem

```bash
cd ~/projects/proep/frontend
rm -rf node_modules dist
npm install
npm run build
```
