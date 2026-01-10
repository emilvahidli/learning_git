# Mac Setup Guide - Backend

## ✅ Nə Edildi:

1. ✅ PostgreSQL 16 quraşdırıldı və işləyir
2. ✅ Database `proep` yaradıldı
3. ✅ User `pro` yaradıldı (parol: `Projson!`)
4. ✅ Schema `admin` yaradıldı
5. ✅ Table `admin.appeal` yaradıldı
6. ✅ Dependencies install olundu

## 🚀 Backend Server Start Etmək:

```bash
cd /Users/emil.vahidli/Projects/proep/backend

# Development server start
npm run dev
```

Server `http://localhost:3000` üzərində işləyəcək.

## 🧪 Test:

### 1. Health Check:

Yeni terminal açın və:

```bash
curl http://localhost:3000/health
```

Görməli olduğunuz:
```json
{
  "success": true,
  "message": "Server is healthy",
  "database": "connected",
  "timestamp": "2026-01-11T..."
}
```

### 2. Appeal Endpoint Test:

```bash
curl -X POST http://localhost:3000/api/appeal \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message from Mac"
  }'
```

Uğurlu response:
```json
{
  "success": true,
  "message": "Appeal created successfully",
  "data": {
    "id": 1,
    "created_date": "2026-01-11T...",
    "mail": "test@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "Test User",
    "message": "Test message from Mac"
  }
}
```

### 3. Validation Error Test:

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
```

Error response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

### 4. Database-dən Yoxlama:

```bash
# Appeals görmək
psql -d proep -U pro -c "SELECT * FROM admin.appeal;"
```

## 📊 Database Yoxlama:

```bash
# Schema-ları görmək
psql -d proep -U pro -c "\dn"

# Table strukturu görmək
psql -d proep -U pro -c "\d admin.appeal"

# Appeals sayı
psql -d proep -U pro -c "SELECT COUNT(*) FROM admin.appeal;"
```

## 🔧 PostgreSQL 14 Conflict Həll:

PostgreSQL 14 conflict olduğu üçün:

```bash
# PostgreSQL 14 stop etmək
brew services stop postgresql@14

# PostgreSQL 14 uninstall (istəsəniz)
brew uninstall postgresql@14

# PostgreSQL 16 istifadə etmək (artıq işləyir)
brew services start postgresql@16
```

## ✅ Yoxlama:

1. ✅ PostgreSQL 16 işləyir (`brew services list | grep postgresql`)
2. ✅ Database `proep` mövcuddur
3. ✅ User `pro` mövcuddur və parol `Projson!`
4. ✅ Schema `admin` yaradıldı
5. ✅ Table `admin.appeal` yaradıldı
6. ✅ Backend dependencies install olundu
7. 🔄 **İndi:** Backend serveri start edin və test edin
