# Backend Troubleshooting - Serverdə Error Yoxlama

## 🔍 Backend Error Yoxlama Komandaları

### **1. PM2 Status Yoxlama:**

```bash
# PM2 status
pm2 list

# PM2 log-ları (son 100 sətir)
pm2 logs proep-backend --lines 100

# PM2 log-ları real-time
pm2 logs proep-backend --lines 0

# PM2 info
pm2 info proep-backend

# PM2 monit (interactive monitoring)
pm2 monit
```

### **2. Backend Server Yoxlama:**

```bash
cd ~/projects/proep/backend

# Server process yoxlama
ps aux | grep node

# Port 3000 istifadə olunub? (başqa process)
sudo lsof -i :3000

# Backend işləyir?
curl http://localhost:3000/health

# Error varsa, log-ları görmək
pm2 logs proep-backend --err --lines 50
```

### **3. Environment Variables Yoxlama:**

```bash
cd ~/projects/proep/backend

# .env faylı mövcuddur?
ls -la .env

# .env faylında nə var?
cat .env

# Environment variables yoxlama (sensitive məlumatları göstərmə)
cat .env | grep -v PASSWORD

# Əgər .env yoxdursa, .env.example-dan copy edin
cp .env.example .env
nano .env  # Production üçün düzəlt
```

### **4. Database Connection Yoxlama:**

```bash
# PostgreSQL işləyir?
sudo systemctl status postgresql

# PostgreSQL connection test
psql -h localhost -U pro -d proep
# Parol: Projson!
# Əgər giriş etmirsə, database problemi var

# Database mövcuddur?
psql -h localhost -U postgres -c "\l" | grep proep

# Schema və table mövcuddur?
psql -h localhost -U pro -d proep -c "\dn"
psql -h localhost -U pro -d proep -c "\dt admin.*"
psql -h localhost -U pro -d proep -c "\d admin.appeal"
```

### **5. Node.js və Dependencies Yoxlama:**

```bash
cd ~/projects/proep/backend

# Node.js versiyası
node --version

# npm versiyası
npm --version

# Dependencies install olunub?
ls -la node_modules/

# Dependencies yenidən install
rm -rf node_modules package-lock.json
npm install

# Backend package.json yoxlama
cat package.json
```

### **6. Backend Code Yoxlama:**

```bash
cd ~/projects/proep/backend

# Backend faylları mövcuddur?
ls -la src/

# Server.js mövcuddur?
ls -la src/server.js

# Database.js mövcuddur?
ls -la src/config/database.js

# Validation.js mövcuddur?
ls -la src/middleware/validation.js

# Routes yoxlama
ls -la src/routes/
ls -la src/controllers/
```

### **7. Backend Manual Start (Debug üçün):**

```bash
cd ~/projects/proep/backend

# PM2-dən stop et
pm2 stop proep-backend

# Manual start (error görmək üçün)
node src/server.js

# Və ya development mode
NODE_ENV=development node src/server.js

# Error görmək üçün
DEBUG=* node src/server.js
```

### **8. Permissions Yoxlama:**

```bash
cd ~/projects/proep/backend

# Backend folder permissions
ls -la

# Owner və permissions yoxlama
sudo chown -R pro:pro ~/projects/proep/backend
sudo chmod -R 755 ~/projects/proep/backend

# Log folder permissions (əgər varsa)
sudo chown -R pro:pro ~/.pm2
```

### **9. Firewall Yoxlama:**

```bash
# Firewall status
sudo ufw status

# Backend port açıqdır?
sudo ufw allow 3000/tcp

# UFW enable
sudo ufw enable
```

### **10. System Logs Yoxlama:**

```bash
# System logs
sudo journalctl -u nginx -n 50
sudo journalctl -u postgresql -n 50

# PM2 logs location
cat ~/.pm2/logs/proep-backend-*.log | tail -100
cat ~/.pm2/logs/proep-backend-error.log | tail -100
```

---

## 🐛 Çox Yayılmış Error-lar və Həlləri:

### **Error 1: Cannot find module**

```bash
cd ~/projects/proep/backend
rm -rf node_modules package-lock.json
npm install
```

### **Error 2: Database connection failed**

```bash
# PostgreSQL işləyir?
sudo systemctl start postgresql
sudo systemctl status postgresql

# .env faylında DB credentials yoxlama
cat .env | grep DB_
```

### **Error 3: Port 3000 already in use**

```bash
# Port 3000 istifadə olunub?
sudo lsof -i :3000

# Process-i öldürmək
sudo kill -9 <PID>

# Və ya PM2 restart
pm2 restart proep-backend
```

### **Error 4: EACCES permission denied**

```bash
# Permissions düzəlt
sudo chown -R pro:pro ~/projects/proep/backend
sudo chmod -R 755 ~/projects/proep/backend
```

### **Error 5: Migration failed**

```bash
cd ~/projects/proep/backend
npm run migrate

# Əgər error varsa, manual migration
psql -h localhost -U pro -d proep -f src/config/migrate.js
```

---

## 📋 Quick Diagnostic Script:

```bash
cat > ~/check-backend.sh << 'EOF'
#!/bin/bash
echo "🔍 Backend Diagnostic Check"
echo "============================"
echo ""

echo "1. PM2 Status:"
pm2 list | grep proep-backend || echo "❌ Backend not running in PM2"
echo ""

echo "2. Backend Health Check:"
curl -s http://localhost:3000/health || echo "❌ Backend not responding"
echo ""

echo "3. PostgreSQL Status:"
sudo systemctl status postgresql | grep Active || echo "❌ PostgreSQL not running"
echo ""

echo "4. Database Connection:"
psql -h localhost -U pro -d proep -c "SELECT NOW();" 2>&1 | head -3
echo ""

echo "5. Environment Variables:"
cd ~/projects/proep/backend
test -f .env && echo "✅ .env file exists" || echo "❌ .env file missing"
echo ""

echo "6. Node Modules:"
test -d node_modules && echo "✅ node_modules exists" || echo "❌ node_modules missing"
echo ""

echo "7. Backend Files:"
test -f src/server.js && echo "✅ server.js exists" || echo "❌ server.js missing"
test -f src/config/database.js && echo "✅ database.js exists" || echo "❌ database.js missing"
echo ""

echo "8. PM2 Logs (last 20 lines):"
pm2 logs proep-backend --lines 20 --nostream 2>&1 | tail -20
EOF

chmod +x ~/check-backend.sh
```

**İstifadə:**
```bash
~/check-backend.sh
```

---

## 📤 Error-ları Göndərmək:

Bu komandaları işlədirsiniz və çıxışını göndərin:

```bash
# 1. PM2 status
pm2 list

# 2. PM2 logs (son 100 sətir)
pm2 logs proep-backend --lines 100 --nostream

# 3. Backend health check
curl http://localhost:3000/health

# 4. Environment variables (sensitive məlumat olmadan)
cd ~/projects/proep/backend
cat .env | grep -v PASSWORD

# 5. Database connection test
psql -h localhost -U pro -d proep -c "SELECT NOW();"

# 6. Backend files yoxlama
ls -la ~/projects/proep/backend/src/
```
