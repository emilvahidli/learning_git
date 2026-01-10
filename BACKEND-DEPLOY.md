# Backend Deploy Guide - Server (Ubuntu)

## 🚀 Serverdə Backend Setup

### **1. Git Pull (Backend fayllarını çəkmək):**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep
git pull origin main
```

### **2. PostgreSQL Install və Setup:**

```bash
# PostgreSQL install
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# PostgreSQL start
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL status
sudo systemctl status postgresql
```

### **3. Database və User Yaratmaq:**

```bash
# Postgres user-a keç
sudo -u postgres psql

# PostgreSQL console-da:
CREATE DATABASE proep;
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
ALTER DATABASE proep OWNER TO pro;
ALTER USER pro CREATEDB;
\q
```

### **4. Backend Setup:**

```bash
cd ~/projects/proep/backend

# Dependencies install
npm install

# Environment variables
cp .env.example .env
nano .env
# .env-də production üçün:
# NODE_ENV=production
# PORT=3000
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=proep
# DB_USER=pro
# DB_PASSWORD=Projson!
# FRONTEND_URL=https://proep.az

# Database migration
npm run migrate
```

### **5. Test (Development):**

```bash
# Server start (test üçün)
npm run dev

# Health check (yeni terminal)
curl http://localhost:3000/health

# Appeal endpoint test
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

### **6. Production (PM2 ilə):**

```bash
# PM2 install (əgər yoxdursa)
sudo npm install -g pm2

# Backend start
cd ~/projects/proep/backend
pm2 start src/server.js --name proep-backend

# PM2 commands
pm2 list
pm2 logs proep-backend
pm2 restart proep-backend
pm2 stop proep-backend

# PM2 save və startup (boot-da avtomatik başlamaq)
pm2 save
pm2 startup
# Çıxan komandı işlədirsiniz (sudo ile)
```

### **7. Nginx Reverse Proxy (Backend üçün):**

```bash
# Nginx config yarat
sudo nano /etc/nginx/sites-available/proep-api
```

```nginx
server {
    listen 80;
    server_name api.proep.az;  # və ya istədiyiniz subdomain

    location / {
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
}
```

```bash
# Symlink yarat
sudo ln -s /etc/nginx/sites-available/proep-api /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx reload
sudo systemctl reload nginx
```

### **8. Firewall (UFW):**

```bash
# Backend port açmaq (3000)
sudo ufw allow 3000/tcp

# UFW status
sudo ufw status
```

---

## ✅ Yoxlama:

### **1. Backend Server:**

```bash
# PM2 status
pm2 list

# Backend log-ları
pm2 logs proep-backend

# Health check
curl http://localhost:3000/health
```

### **2. Database:**

```bash
# Database connection test
psql -h localhost -U pro -d proep
# Parol: Projson!

# Schema-ları görmək
\dn

# Table strukturu görmək
\d admin.appeal

# Appeals görmək
SELECT * FROM admin.appeal;
```

### **3. API Endpoint:**

```bash
# Appeal endpoint test
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

## 🔧 Troubleshooting:

### **Error: Missing script: "migrate"**

```bash
# Backend fayllarını yoxlamaq
cd ~/projects/proep/backend
ls -la

# Package.json yoxlamaq
cat package.json | grep migrate

# Əgər fayllar yoxdursa:
cd ~/projects/proep
git pull origin main
cd backend
npm install
npm run migrate
```

### **Error: Database connection failed**

```bash
# PostgreSQL status
sudo systemctl status postgresql

# PostgreSQL start (əgər işləmirsə)
sudo systemctl start postgresql

# Database connection test
psql -h localhost -U pro -d proep
# Parol: Projson!
```

### **Error: Permission denied**

```bash
# Backend folder permissions
sudo chown -R pro:pro ~/projects/proep/backend
sudo chmod -R 755 ~/projects/proep/backend

# Node modules permissions
cd ~/projects/proep/backend
sudo chown -R pro:pro node_modules
```

---

## 📝 Növbəti Addımlar:

1. ✅ Git pull (backend faylları)
2. ✅ PostgreSQL install və setup
3. ✅ Database və user yaratmaq
4. ✅ Backend dependencies install
5. ✅ Environment variables setup
6. ✅ Database migration
7. ✅ PM2 ilə production start
8. ✅ Nginx reverse proxy (istəsəniz)
