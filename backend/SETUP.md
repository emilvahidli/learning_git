# Backend Setup Guide - Mac və Server

## 🍎 Mac üçün Setup

### 1. Node.js Install

```bash
# Homebrew ilə
brew install node

# Yoxlama
node --version  # v18+ olmalıdır
npm --version
```

### 2. PostgreSQL Install və Setup

```bash
# PostgreSQL install
brew install postgresql@14

# PostgreSQL start
brew services start postgresql@14

# PostgreSQL status
brew services list | grep postgresql

# Database və user yaratmaq
createdb proep
psql postgres

# PostgreSQL console-da:
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
ALTER DATABASE proep OWNER TO pro;
\q
```

### 3. Backend Setup

```bash
cd /Users/emil.vahidli/Projects/proep/backend

# Dependencies install
npm install

# Environment variables
cp .env.example .env
# .env faylını açın və düzəltin (əgər lazımsa)

# Database migration
npm run migrate

# Development server start
npm run dev
```

### 4. Test

```bash
# Health check
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

---

## 🐧 Server (Ubuntu) üçün Setup

### 1. Node.js Install

```bash
# Node.js 18.x repository əlavə et
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Node.js install
sudo apt-get install -y nodejs

# Yoxlama
node --version  # v18+ olmalıdır
npm --version
```

### 2. PostgreSQL Install və Setup

```bash
# PostgreSQL install
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# PostgreSQL start
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL status
sudo systemctl status postgresql

# Postgres user-a keç
sudo -u postgres psql

# PostgreSQL console-da:
CREATE DATABASE proep;
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
ALTER DATABASE proep OWNER TO pro;
ALTER USER pro CREATEDB;  # Əgər schema yaratmaq lazımdırsa
\q

# Connection test
psql -h localhost -U pro -d proep
# Parol: Projson!
```

### 3. Backend Setup

```bash
cd ~/projects/proep/backend

# Dependencies install
npm install

# Environment variables
cp .env.example .env
nano .env  # və ya vi .env

# .env faylında:
# PORT=3000
# NODE_ENV=production
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=proep
# DB_USER=pro
# DB_PASSWORD=Projson!
# FRONTEND_URL=https://proep.az

# Database migration
npm run migrate

# Test (development rejimində)
npm run dev

# Production rejimində (PM2 ilə)
npm install -g pm2
pm2 start src/server.js --name proep-backend
pm2 save
pm2 startup  # Boot-da avtomatik başlamaq üçün
```

### 4. PM2 Setup (Production)

```bash
# PM2 install
sudo npm install -g pm2

# Backend start
cd ~/projects/proep/backend
pm2 start src/server.js --name proep-backend --env production

# PM2 commands
pm2 list                    # Process-ləri göstər
pm2 logs proep-backend      # Log-ları göstər
pm2 restart proep-backend   # Restart
pm2 stop proep-backend      # Stop
pm2 delete proep-backend    # Sil

# PM2 save və startup
pm2 save
pm2 startup
# Çıxan komandı işlədirsiniz (sudo ile)
```

### 5. Nginx Reverse Proxy (Production)

Nginx config əlavə edin:

```bash
sudo nano /etc/nginx/sites-available/proep-backend
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
sudo ln -s /etc/nginx/sites-available/proep-backend /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx reload
sudo systemctl reload nginx
```

### 6. Firewall (UFW) Setup

```bash
# Backend port açmaq (3000)
sudo ufw allow 3000/tcp

# Nginx port (80, 443) artıq açıqdır
sudo ufw status
```

---

## 🔧 Troubleshooting

### PostgreSQL Connection Error

```bash
# PostgreSQL status yoxlama
sudo systemctl status postgresql

# PostgreSQL log-ları
sudo tail -f /var/log/postgresql/postgresql-*-main.log

# Connection test
psql -h localhost -U pro -d proep
```

### Port Already in Use

```bash
# Port 3000-də nə işləyir?
sudo lsof -i :3000

# Process kill etmək
sudo kill -9 <PID>
```

### Permission Denied

```bash
# Backend folder permissions
sudo chown -R pro:pro ~/projects/proep/backend
sudo chmod -R 755 ~/projects/proep/backend
```

---

## 📝 Test Commands

### Health Check

```bash
curl http://localhost:3000/health
```

### Create Appeal

```bash
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "This is a test message"
  }'
```

### Get All Appeals

```bash
curl http://localhost:3000/api/appeal
```

### Validation Error Test

```bash
# Invalid email
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "invalid-email",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test",
    "message": "Test"
  }'

# Missing field
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1
  }'
```

---

## ✅ Yoxlama

1. ✅ Node.js install olunub
2. ✅ PostgreSQL install olunub və işləyir
3. ✅ Database `proep` yaradılıb
4. ✅ User `pro` yaradılıb və parol `Projson!`
5. ✅ Migration işləyib (schema və table yaradılıb)
6. ✅ Backend server işləyir (port 3000)
7. ✅ Health check işləyir
8. ✅ Appeal endpoint işləyir
