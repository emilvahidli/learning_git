# Local-dan Server PostgreSQL-ə Qoşulmaq

## 🔐 Metod 1: SSH Tunnel (Tövsiyə Olunur - Ən Təhlükəsiz)

### **SSH Tunnel Yaratmaq:**

```bash
# Terminal-də (Mac)
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
```

**Bu komanda:**
- Local port `5433`-ü serverdəki PostgreSQL port `5432`-yə bağlayır
- `-N` flag: command işlətmir, yalnız tunnel saxlayır
- Terminal açıq qalmalıdır (tunnel işləmək üçün)

### **Local-dan Connection:**

**Yeni terminal açın və:**

```bash
# PostgreSQL client ilə
psql -h localhost -p 5433 -U pro -d proep
# Parol: Projson!
```

**Və ya connection string:**
```bash
PGPASSWORD='Projson!' psql -h localhost -p 5433 -U pro -d proep
```

### **pgAdmin və ya DBeaver ilə:**

**Connection Settings:**
- **Host:** `localhost`
- **Port:** `5433` (SSH tunnel port)
- **Database:** `proep`
- **Username:** `pro`
- **Password:** `Projson!`

---

## 🔐 Metod 2: SSH üzərindən Birbaşa (psql)

```bash
# SSH üzərindən PostgreSQL-ə birbaşa qoşulmaq
ssh pro@78.46.213.237 "psql -h localhost -U pro -d proep"
# Parol: Projson!
```

**Və ya:**
```bash
ssh -t pro@78.46.213.237 "psql -h localhost -U pro -d proep"
```

---

## 🔐 Metod 3: SSH Tunnel Script (Asan İstifadə)

### **Tunnel Start Script:**

```bash
# ~/tunnel-postgres.sh yarat
cat > ~/tunnel-postgres.sh << 'EOF'
#!/bin/bash
echo "🚇 Starting PostgreSQL SSH tunnel..."
echo "📍 Local port: 5433"
echo "📍 Remote: 78.46.213.237:5432"
echo "⚠️  Keep this terminal open!"
echo ""
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
EOF

chmod +x ~/tunnel-postgres.sh
```

**İstifadə:**
```bash
# Tunnel start
~/tunnel-postgres.sh

# Yeni terminal-də connection
psql -h localhost -p 5433 -U pro -d proep
```

### **Tunnel Stop:**

Tunnel terminal-də `Ctrl+C` basın.

---

## 🛠️ GUI Tools (pgAdmin, DBeaver, TablePlus)

### **pgAdmin:**

1. **pgAdmin açın**
2. **Add New Server:**
   - **Name:** Proep Server
   - **Host:** `localhost`
   - **Port:** `5433` (SSH tunnel port)
   - **Database:** `proep`
   - **Username:** `pro`
   - **Password:** `Projson!`

**Vacib:** Əvvəlcə SSH tunnel start olmalıdır!

### **DBeaver:**

1. **New Database Connection** → **PostgreSQL**
2. **Connection Settings:**
   - **Host:** `localhost`
   - **Port:** `5433`
   - **Database:** `proep`
   - **Username:** `pro`
   - **Password:** `Projson!`
3. **SSH Tab:**
   - **Use SSH Tunnel:** ✅
   - **Host:** `78.46.213.237`
   - **Port:** `22`
   - **Username:** `pro`
   - **Authentication:** Password və ya SSH Key

### **TablePlus:**

1. **New Connection** → **PostgreSQL**
2. **Connection Settings:**
   - **Host:** `localhost`
   - **Port:** `5433`
   - **Database:** `proep`
   - **User:** `pro`
   - **Password:** `Projson!`
3. **SSH Tab:**
   - **Use SSH:** ✅
   - **SSH Host:** `78.46.213.237`
   - **SSH Port:** `22`
   - **SSH User:** `pro`

---

## 📋 Quick Commands

### **Tunnel Start:**
```bash
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
```

### **Connection Test:**
```bash
# Terminal-də
psql -h localhost -p 5433 -U pro -d proep

# Və ya connection string
PGPASSWORD='Projson!' psql -h localhost -p 5433 -U pro -d proep
```

### **Database Yoxlama:**
```sql
-- Schema-ları görmək
\dn

-- Table-ları görmək
\dt admin.*

-- Appeal table strukturu
\d admin.appeal

-- Appeals görmək
SELECT * FROM admin.appeal;

-- Appeals sayı
SELECT COUNT(*) FROM admin.appeal;
```

---

## ⚠️ Təhlükəsizlik Qeydləri

1. **SSH Tunnel istifadə edin** - Database portunu birbaşa açmayın
2. **Firewall:** Serverdə PostgreSQL portunu (5432) external-dan açmayın
3. **SSH Key:** SSH key istifadə edin (password-dən daha təhlükəsiz)
4. **VPN:** Əgər mümkündürsə, VPN istifadə edin

---

## 🔧 Troubleshooting

### **Error: connection refused**

```bash
# SSH tunnel işləyir? Yoxlama
ps aux | grep "ssh -L 5433"

# Tunnel yenidən start
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
```

### **Error: password authentication failed**

```bash
# Serverdə parol yoxlama
ssh pro@78.46.213.237
psql -h localhost -U pro -d proep
# Parol: Projson!
```

### **Error: database does not exist**

```bash
# Serverdə database yoxlama
ssh pro@78.46.213.237
psql -h localhost -U postgres -c "\l" | grep proep
```

---

## ✅ Test

**1. SSH Tunnel Start:**
```bash
ssh -L 5433:localhost:5432 pro@78.46.213.237 -N
```

**2. Yeni Terminal-də Connection:**
```bash
psql -h localhost -p 5433 -U pro -d proep
```

**3. Database-də Query:**
```sql
SELECT * FROM admin.appeal;
\q
```

---

## 📝 Qeyd

- **SSH Tunnel terminal açıq qalmalıdır** (tunnel işləmək üçün)
- **Local port 5433** istifadə edirik (5432 serverdə işləyir)
- **GUI tools** üçün SSH tunnel əvvəlcə start olmalıdır
