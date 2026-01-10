# Serverə Deploy - Addım-Addım Komandalar

## 📋 Deploy Addımları

### **1. Local-dan Git Commit və Push**

```bash
cd /Users/emil.vahidli/Projects/proep

# Dəyişiklikləri görmək
git status

# Bütün dəyişiklikləri add etmək
git add .

# Commit etmək
git commit -m "Update Contact form: fix double submission, add colons to labels, improve appeal options"

# Push etmək
git push origin main
```

**Əgər SSH key problemi varsa:**
```bash
# HTTPS istifadə etmək
git remote set-url origin https://github.com/emilvahidli/learning_git.git
git push origin main
```

---

### **2. Serverdə Git Pull**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep

# Git pull
git pull origin main

# Əgər conflict varsa:
# git checkout -- frontend/src/pages/Contact.tsx
# git pull origin main
```

---

### **3. Frontend Build və Deploy**

```bash
cd ~/projects/proep/frontend

# Dependencies install (əgər yeni package əlavə olunubsa)
npm install

# Build
npm run build

# Build yoxlama
ls -la dist/

# Nginx-də serve olunan yeri yoxlama
# (Əgər /var/www/proep.az istifadə edirsinizsə)
sudo cp -r dist/* /var/www/proep.az/

# Və ya Nginx config-də root path yoxlama
# sudo nginx -t
# sudo systemctl reload nginx
```

---

### **4. Backend Deploy**

```bash
cd ~/projects/proep/backend

# Dependencies install (əgər yeni package əlavə olunubsa)
npm install

# .env faylını yoxlama (production üçün)
cat .env

# Backend migration (əgər yeni migration varsa - bu halda yoxdur)
# npm run migrate

# Backend server restart (PM2 ilə)
pm2 restart proep-backend

# PM2 status yoxlama
pm2 list
pm2 logs proep-backend --lines 50
```

---

### **5. Nginx Config Yoxlama (Əgər lazımdırsa)**

```bash
# Frontend Nginx config yoxlama
sudo nginx -t

# Backend API proxy (əgər eyni domain-də)
sudo nano /etc/nginx/sites-available/proep.az
```

**Backend API proxy əlavə etmək (əgər lazımdırsa):**
```nginx
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
```

```bash
# Nginx reload
sudo nginx -t
sudo systemctl reload nginx
```

---

### **6. Test**

```bash
# Frontend test
curl -I https://proep.az

# Backend health check
curl http://localhost:3000/health

# Backend appeal endpoint test
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

## 🔧 Quick Deploy Script

**Serverdə quick deploy script yaratmaq:**

```bash
ssh pro@78.46.213.237

cat > ~/deploy-proep.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Proep.az deployment..."

cd ~/projects/proep

# Git pull
echo "📥 Pulling latest changes..."
git pull origin main || exit 1

# Frontend build
echo "🏗️  Building frontend..."
cd frontend
npm install
npm run build

# Copy to web root (if needed)
# sudo cp -r dist/* /var/www/proep.az/

# Backend restart
echo "🔄 Restarting backend..."
cd ../backend
npm install
pm2 restart proep-backend

echo "✅ Deployment completed!"
echo "📍 Frontend: https://proep.az"
echo "📍 Backend: http://localhost:3000"
EOF

chmod +x ~/deploy-proep.sh
```

**İstifadə:**
```bash
~/deploy-proep.sh
```

---

## ⚠️ Troubleshooting

### **Git Pull Conflict**

```bash
cd ~/projects/proep
git stash
git pull origin main
git stash pop  # Əgər lazımdırsa
```

### **Build Error**

```bash
cd ~/projects/proep/frontend
rm -rf node_modules dist
npm install
npm run build
```

### **PM2 Backend Not Running**

```bash
cd ~/projects/proep/backend
pm2 start src/server.js --name proep-backend
pm2 save
```

### **Nginx Permission Error**

```bash
sudo chown -R www-data:www-data /var/www/proep.az
sudo chmod -R 755 /var/www/proep.az
```

---

## ✅ Deploy Checklist

- [ ] Local-dan git commit və push
- [ ] Serverdə git pull
- [ ] Frontend dependencies install
- [ ] Frontend build
- [ ] Frontend files copy (əgər lazımdırsa)
- [ ] Backend dependencies install
- [ ] Backend PM2 restart
- [ ] Nginx config yoxlama
- [ ] Frontend test (https://proep.az)
- [ ] Backend test (health check)
- [ ] Contact form test (production)
