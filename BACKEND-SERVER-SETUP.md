# Backend Server Setup - Addım-Addım

## ✅ 1. Git Pull Tamamlandı

Metod 2 ilə git conflict həll olundu.

---

## 📋 2. Serverdə Backend Setup (Addım-Addım)

### **Addım 1: Backend Dependencies Install**

```bash
ssh pro@78.46.213.237
cd ~/projects/proep/backend

# Dependencies install
npm install
```

### **Addım 2: Environment Variables Setup**

```bash
cd ~/projects/proep/backend

# .env.example-dan .env yarat
cp .env.example .env

# .env faylını redaktə et
nano .env
```

**.env faylında (production üçün):**
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proep
DB_USER=pro
DB_PASSWORD=Projson!

# CORS
FRONTEND_URL=https://proep.az
```

### **Addım 3: PostgreSQL Install və Setup**

```bash
# PostgreSQL install (əgər yoxdursa)
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# PostgreSQL start
sudo systemctl start postgresql
sudo systemctl enable postgresql

# PostgreSQL status yoxlama
sudo systemctl status postgresql
```

### **Addım 4: Database və User Yaratmaq**

```bash
# Postgres user-a keç
sudo -u postgres psql
```

**PostgreSQL console-da:**
```sql
CREATE DATABASE proep;
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
ALTER DATABASE proep OWNER TO pro;
ALTER USER pro CREATEDB;
\q
```

**Connection test:**
```bash
psql -h localhost -U pro -d proep
# Parol: Projson!
# Əgər işləyirsə, \q yazın və çıxın
```

### **Addım 5: Database Migration**

```bash
cd ~/projects/proep/backend

# Migration işlətmək
npm run migrate
```

**Görməli olduğunuz:**
```
✅ Database connected successfully
🔄 Starting database migration...
✅ Schema "admin" created
✅ Table "admin.appeal" created
✅ Index on created_date created
✅ Index on mail created
✅ Migration completed successfully!
✅ Database setup complete!
```

### **Addım 6: Database Yoxlama**

```bash
# Schema-ları görmək
psql -d proep -U pro -c "\dn"

# Table strukturu görmək
psql -d proep -U pro -c "\d admin.appeal"
```

### **Addım 7: Backend Server Test (Development)**

```bash
cd ~/projects/proep/backend

# Development server start
npm run dev
```

**Yeni terminal açın və test edin:**

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
    "message": "Test message from server"
  }'

# Database-dən yoxlama
psql -d proep -U pro -c "SELECT * FROM admin.appeal;"
```

**Əgər test uğurlu oldu, serveri dayandırın (Ctrl+C) və production-ə keçin.**

### **Addım 8: Production (PM2 ilə)**

```bash
cd ~/projects/proep/backend

# PM2 install (əgər yoxdursa)
sudo npm install -g pm2

# Production server start
pm2 start src/server.js --name proep-backend

# PM2 status
pm2 list

# PM2 log-ları
pm2 logs proep-backend

# PM2 save (restart-dan sonra qalıcı olsun)
pm2 save

# PM2 startup (boot-da avtomatik başlamaq)
pm2 startup
# Çıxan komandı işlədirsiniz (sudo ile)
```

### **Addım 9: Nginx Reverse Proxy (İstəsəniz)**

**Backend üçün ayrı subdomain (məsələn: `api.proep.az`):**

```bash
# Nginx config yarat
sudo nano /etc/nginx/sites-available/proep-api
```

```nginx
server {
    listen 80;
    server_name api.proep.az;

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

**Və ya eyni domain-də path ilə (məsələn: `proep.az/api`):**

Frontend Nginx config-inə əlavə edin:
```nginx
# Backend API proxy
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## ✅ Yoxlama Listi

- [ ] Backend dependencies install olundu (`npm install`)
- [ ] Environment variables setup olundu (`.env` faylı)
- [ ] PostgreSQL install olundu və işləyir
- [ ] Database `proep` yaradıldı
- [ ] User `pro` yaradıldı (parol: `Projson!`)
- [ ] Database migration uğurlu oldu (`npm run migrate`)
- [ ] Schema `admin` yaradıldı
- [ ] Table `admin.appeal` yaradıldı
- [ ] Backend server test edildi (`npm run dev`)
- [ ] Health check işləyir (`/health`)
- [ ] Appeal endpoint işləyir (`POST /api/appeal`)
- [ ] PM2 ilə production start olundu (istəsəniz)
- [ ] Nginx reverse proxy setup olundu (istəsəniz)

---

## 🔧 Troubleshooting

### npm install error?

```bash
# Node.js versiyası yoxlama
node --version  # 18+ olmalıdır

# npm versiyası yoxlama
npm --version

# Əgər yoxdursa:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Database connection error?

```bash
# PostgreSQL status
sudo systemctl status postgresql

# PostgreSQL log-ları
sudo tail -f /var/log/postgresql/postgresql-*-main.log

# Connection test
psql -h localhost -U pro -d proep
```

### npm run migrate error?

```bash
# .env faylı yoxlama
cd ~/projects/proep/backend
cat .env

# Database connection test
psql -h localhost -U pro -d proep -c "SELECT NOW();"

# Migration faylını yoxlama
cat src/config/migrate.js | head -20
```

---

## 📝 Növbəti Addımlar

1. ✅ Git pull tamamlandı
2. 🔄 **İndi:** Backend dependencies install (`npm install`)
3. 🔄 **Sonra:** Environment variables setup (`.env`)
4. 🔄 **Sonra:** PostgreSQL setup (əgər lazımdırsa)
5. 🔄 **Sonra:** Database migration (`npm run migrate`)
6. 🔄 **Sonra:** Test (`npm run dev`)
7. 🔄 **Sonra:** Production (`pm2 start`)
