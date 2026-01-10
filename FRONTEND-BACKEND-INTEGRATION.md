# Frontend-Backend Integration - Contact Form

## ✅ Nə Edildi:

1. ✅ Contact form-u backend API-yə bağlandı
2. ✅ Form field-ləri backend requirement-lərinə uyğunlaşdırıldı:
   - `name` → `name` (max 30 simvol)
   - `email` → `mail` (backend-də)
   - `phone_number` → `phone_number` (yeni field əlavə edildi)
   - `appeal` → `appeal` (enum integer 1-5, dropdown)
   - `message` → `message` (max 2000 simvol)
3. ✅ Validation əlavə edildi (frontend və backend)
4. ✅ Error handling əlavə edildi
5. ✅ Loading state əlavə edildi
6. ✅ Success/Error messages əlavə edildi
7. ✅ Character counter əlavə edildi (name və message üçün)

---

## 🔧 Configuration

### **Frontend API URL:**

**Local Development:**
```bash
# .env.local (frontend)
VITE_API_URL=http://localhost:3000
```

**Production:**
```bash
# .env.production (frontend)
VITE_API_URL=https://proep.az/api
# Və ya backend subdomain üçün:
# VITE_API_URL=https://api.proep.az
```

### **Backend CORS:**

Backend-də `.env` faylında:
```env
FRONTEND_URL=http://localhost:5173  # Development
# Və ya
FRONTEND_URL=https://proep.az  # Production
```

---

## 📋 Form Field Mapping

**Frontend Form → Backend API:**

| Frontend Field | Backend Field | Type | Validation |
|---|---|---|---|
| `name` | `name` | string | Required, 1-30 characters |
| `email` | `mail` | string | Required, valid email |
| `phone_number` | `phone_number` | string | Required, 1-50 characters |
| `appeal` | `appeal` | integer | Required, 1-5 (enum) |
| `message` | `message` | string | Required, 1-2000 characters |

**Appeal Types (Enum):**
- `1` - AI Konsaltinq / AI Consulting
- `2` - Backend Development
- `3` - API Həlləri / API Solutions
- `4` - Avtomatlaşdırma / Automation
- `5` - Digər / Other

---

## 🧪 Test

### **Local Development:**

1. **Backend start:**
   ```bash
   cd backend
   npm run dev
   # Server işləyir: http://localhost:3000
   ```

2. **Frontend start:**
   ```bash
   cd frontend
   npm run dev
   # Frontend işləyir: http://localhost:5173
   ```

3. **Contact form test:**
   - `http://localhost:5173/contact/az` və ya `/contact/en`
   - Form-u doldurun və "Göndər" klikləyin
   - Database-də `admin.appeal` table-da yeni record yaranmalıdır

### **Production:**

1. **Backend serverdə işləyir (PM2):**
   ```bash
   pm2 list
   pm2 logs proep-backend
   ```

2. **Frontend deploy:**
   ```bash
   cd frontend
   npm run build
   # dist folder Nginx-də serve olunur
   ```

3. **API URL Production:**
   - Frontend `.env.production` faylında: `VITE_API_URL=https://proep.az/api`
   - Və ya Nginx-də backend proxy: `/api` → `http://localhost:3000`

---

## 🔧 Nginx Reverse Proxy (Backend üçün)

**Frontend Nginx config-ə əlavə etmək:**

```nginx
# Backend API proxy
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

**Və ya ayrı subdomain (api.proep.az):**

```nginx
server {
    listen 80;
    server_name api.proep.az;

    location / {
        proxy_pass http://localhost:3000;
        # ... proxy settings ...
    }
}
```

---

## ✅ Error Handling

**Frontend error messages:**
- Validation error: "Xahiş edirik bütün sahələri düzgün doldurun."
- Network error: "Şəbəkə xətası. İnternet bağlantınızı yoxlayın."
- Server error: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."

**Backend error response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Email must be a valid email address",
      "param": "mail",
      "location": "body"
    }
  ]
}
```

---

## 📝 Next Steps

1. ✅ Contact form backend-ə bağlandı
2. 🔄 **Növbəti:** Production-də API URL-i təyin etmək
3. 🔄 **Növbəti:** Nginx reverse proxy setup (əgər lazımdırsa)
4. 🔄 **Növbəti:** Frontend-də environment variables setup
5. 🔄 **Növbəti:** Email notification (istəsəniz)

---

## 🐛 Troubleshooting

### **Error: Network request failed**

1. **Backend işləyir?**
   ```bash
   curl http://localhost:3000/health
   ```

2. **CORS error?**
   - Backend `.env` faylında `FRONTEND_URL` düzgündürmü?
   - Backend CORS config yoxlama

3. **API URL düzgündürmü?**
   - Frontend `api.ts` faylında API URL yoxlama
   - Environment variables yoxlama

### **Error: Validation failed**

1. **Form field-ləri düzgün doldurulub?**
   - Name: max 30 simvol
   - Email: valid email format
   - Phone: max 50 simvol
   - Appeal: 1-5 integer
   - Message: max 2000 simvol

2. **Backend validation middleware yoxlama**

---

## 📊 Database Yoxlama

**pgAdmin və ya psql ilə:**

```sql
-- Appeals görmək
SELECT * FROM admin.appeal ORDER BY created_date DESC;

-- Son 5 appeal
SELECT id, name, mail, phone_number, appeal, created_date 
FROM admin.appeal 
ORDER BY created_date DESC 
LIMIT 5;
```
