# Admin Authentication Setup

Admin panel üçün authentication sistemi qurulub.

## 📋 Xüsusiyyətlər

- ✅ Login/Logout
- ✅ JWT Token Authentication
- ✅ Session idarəetməsi (database-də)
- ✅ Password hash-ləmə (crypto pbkdf2)
- ✅ Token expire yoxlanması
- ✅ IP address və User Agent logging
- ✅ Role-based authorization (admin, super_admin)

## 🔧 Quraşdırma

### 1. Database Schema Yaratmaq

İlk admin user və schema-nı yaratmaq üçün:

```bash
cd /Users/emil.vahidli/Projects/proep/backend
npm run create-admin
```

Bu komanda:
- `admin_users` table yaradır
- `admin_sessions` table yaradır
- İlk admin user yaradır: `emil.vahidli` / `Projson!`

### 2. .env Faylında

`.env` faylına əlavə edin (optional):

```env
JWT_SECRET=your-super-secret-key-here-2026
```

Əgər JWT_SECRET yoxdursa, default olaraq `proep-secret-key-2026` istifadə olunacaq.

## 📡 API Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "emil.vahidli",
  "password": "Projson!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Giriş uğurlu",
  "data": {
    "token": "eyJpZCI6MSw...",
    "admin": {
      "id": 1,
      "username": "emil.vahidli",
      "fullName": "Emil Vahidli",
      "email": "info@proep.az",
      "role": "super_admin"
    }
  }
}
```

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": 1,
      "username": "emil.vahidli",
      "fullName": "Emil Vahidli",
      "email": "info@proep.az",
      "role": "super_admin",
      "lastLogin": "2026-01-11T18:30:00.000Z"
    }
  }
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "message": "Çıxış uğurlu"
}
```

### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "currentPassword": "Projson!",
  "newPassword": "YeniSifre123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Şifrə uğurla dəyişdirildi"
}
```

## 🔐 Frontend İnteqrasiyası

### 1. Login

```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'emil.vahidli',
    password: 'Projson!',
  }),
});

const data = await response.json();

if (data.success) {
  // Token-ı localStorage-ə yaz
  localStorage.setItem('adminToken', data.data.token);
  // Admin məlumatlarını saxla
  localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
}
```

### 2. Authenticated Request

```javascript
const token = localStorage.getItem('adminToken');

const response = await fetch('http://localhost:3000/api/auth/verify', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

### 3. Logout

```javascript
const token = localStorage.getItem('adminToken');

await fetch('http://localhost:3000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

// Token-ı təmizlə
localStorage.removeItem('adminToken');
localStorage.removeItem('adminUser');
```

## 🛡️ Middleware İstifadəsi

Protected route yaratmaq üçün:

```javascript
import { requireAuth, requireRole } from './middleware/auth.js';

// Sadə authentication
router.get('/protected', requireAuth, (req, res) => {
  // req.admin mövcuddur
  res.json({ user: req.admin });
});

// Role-based authorization
router.post('/super-action', requireAuth, requireRole('super_admin'), (req, res) => {
  // Yalnız super_admin əməliyyat edə bilər
  res.json({ message: 'Success' });
});
```

## 📊 Database Schema

### admin_users table
```sql
- id (SERIAL PRIMARY KEY)
- username (VARCHAR UNIQUE)
- password_hash (VARCHAR)
- full_name (VARCHAR)
- email (VARCHAR)
- role (VARCHAR: 'admin', 'super_admin')
- is_active (BOOLEAN)
- last_login (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### admin_sessions table
```sql
- id (SERIAL PRIMARY KEY)
- admin_id (INTEGER FK)
- token_hash (VARCHAR)
- ip_address (VARCHAR)
- user_agent (TEXT)
- expires_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

## ⚠️ Təhlükəsizlik Qeydləri

1. **Production-da bcrypt istifadə edin**
   - Hazırda crypto pbkdf2 istifadə olunur
   - bcrypt daha təhlükəsizdir
   - `npm install bcrypt` və auth.js-də dəyişdirin

2. **JWT_SECRET dəyişdirin**
   - Production-da güclü secret istifadə edin
   - Environment variable kimi saxlayın

3. **HTTPS istifadə edin**
   - Token-lar həssasdır
   - SSL/TLS mütləqdir

4. **Token expire vaxtı**
   - Hazırda 24 saat
   - Ehtiyacınıza görə tənzimləyin

5. **Rate limiting əlavə edin**
   - Login endpoint-ə rate limit qoyun
   - Brute force hücumlarına qarşı

## 🚀 Növbəti Addımlar

1. ✅ Database setup - `npm run create-admin`
2. ✅ Backend test - Postman və ya cURL ilə
3. ⏳ Frontend inteqrasiya - Admin panel ilə qoşun
4. ⏳ Production-a deploy

## 🔍 Test

Postman və ya cURL ilə test edin:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emil.vahidli","password":"Projson!"}'

# Verify (token-ı əvəz edin)
curl http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 Login Məlumatları

İlk setup-dan sonra:

- **Username:** emil.vahidli
- **Password:** Projson!
- **Role:** super_admin

⚠️ İlk login-dən sonra şifrəni DƏYİŞDİRİN!
