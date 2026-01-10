# pgAdmin 4 Setup - SSH Tunnel (SSH Tunnel Script Olmadan)

## 🎯 pgAdmin-də SSH Tunnel Setup

pgAdmin 4-də SSH tunnel funksiyası var. SSH tunnel script açmadan birbaşa pgAdmin-dən qoşula bilərsiniz.

---

## 📋 Addım-Addım Setup

### **1. pgAdmin-də Yeni Server Yaratmaq:**

1. **pgAdmin açın**
2. **Sol panel-də "Servers" sağ klikləyin**
3. **"Register" → "Server..."** seçin

### **2. General Tab:**

- **Name:** `Proep Server` (və ya istədiyiniz ad)
- **Server group:** `Servers`
- **Comments:** (boş qoyula bilər)

### **3. Connection Tab:**

**Basic Settings:**
- **Host name/address:** `localhost` ✅ (vacib! localhost yazın)
- **Port:** `5432` ✅ (serverdəki PostgreSQL port)
- **Maintenance database:** `proep`
- **Username:** `pro`
- **Password:** `Projson!`
- **Save password:** ✅ (parolu saxlayır)

### **4. SSH Tunnel Tab (Vacib!):**

**SSH Tunnel aktivləşdirmək:**
- **Use SSH tunneling:** ✅ (işarələyin!)

**SSH Settings:**
- **Tunnel host:** `78.46.213.237`
- **Tunnel port:** `22`
- **Username:** `pro`
- **Authentication:**
  - **Password:** SSH parolunuz (pro user-in SSH parolu)
  - **Və ya SSH Key:** SSH key fayl yolu (məsələn: `~/.ssh/id_rsa`)

**Tunnel Settings:**
- **Remote host:** `localhost`
- **Remote port:** `5432`
- **Local port:** `5433` (və ya boş buraxın, pgAdmin avtomatik tapa bilər)

### **5. Save:**

**"Save"** klikləyin.

---

## ✅ Test

pgAdmin-də server-ə sağ klikləyin və **"Connect Server"** seçin.

Əgər uğurlu oldu, server açılacaq və database-ləri görə bilərsiniz.

---

## 🔧 SSH Key Setup (Parol Yerinə)

SSH parol yazmaqdan yayınmaq üçün SSH key istifadə edə bilərsiniz:

### **1. SSH Key Yaratmaq (Mac-də):**

```bash
# SSH key yaratmaq (əgər yoxdursa)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# Enter basın (default location üçün)
# Parol daxil edin (və ya boş buraxın)
```

### **2. SSH Key Serverə Copy Etmək:**

```bash
# SSH key serverə copy etmək
ssh-copy-id pro@78.46.213.237

# Və ya manual:
cat ~/.ssh/id_rsa.pub | ssh pro@78.46.213.237 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### **3. pgAdmin-də SSH Key İstifadə:**

**SSH Tunnel Tab:**
- **Use SSH tunneling:** ✅
- **Tunnel host:** `78.46.213.237`
- **Tunnel port:** `22`
- **Username:** `pro`
- **Authentication:**
  - **Identity file:** `~/.ssh/id_rsa` (və ya tam path: `/Users/emil.vahidli/.ssh/id_rsa`)
  - **Passphrase:** (əgər SSH key parol varsa)

---

## 🔒 Təhlükəsizlik (SSH Key Tövsiyə Olunur)

SSH parol yazmaqdan yayınmaq üçün SSH key istifadə edin:

**Mac-də SSH key yaratmaq:**
```bash
# SSH key yaratmaq
ssh-keygen -t rsa -b 4096 -C "proep@example.com"
# Location: ~/.ssh/id_rsa (Enter basın)
# Passphrase: (parol daxil edin və ya boş buraxın)

# SSH key serverə copy etmək
ssh-copy-id pro@78.46.213.237

# Yoxlama
ssh pro@78.46.213.237
# Parolsuz giriş etməlidir (SSH key işləyirsə)
```

**pgAdmin-də SSH Key Path:**
```
/Users/emil.vahidli/.ssh/id_rsa
```

---

## 🆘 Troubleshooting

### **Error: SSH tunnel failed**

1. **SSH connection test:**
   ```bash
   ssh pro@78.46.213.237
   # Parol ilə giriş etməlidir
   ```

2. **SSH key test (əgər SSH key istifadə edirsinizsə):**
   ```bash
   ssh -i ~/.ssh/id_rsa pro@78.46.213.237
   ```

3. **pgAdmin-də SSH Tunnel Settings yoxlama:**
   - Tunnel host: `78.46.213.237` (IP düzgündürmü?)
   - Tunnel port: `22` (SSH port düzgündürmü?)
   - Username: `pro` (SSH username düzgündürmü?)

### **Error: Password authentication failed**

1. **SSH parol yoxlama:**
   ```bash
   ssh pro@78.46.213.237
   # Parol daxil edin
   ```

2. **pgAdmin-də SSH Tunnel tab-da parol yoxlama**

### **Error: Database connection failed**

1. **Serverdə PostgreSQL işləyir?**
   ```bash
   ssh pro@78.46.213.237
   sudo systemctl status postgresql
   ```

2. **Database mövcuddur?**
   ```bash
   ssh pro@78.46.213.237
   psql -h localhost -U pro -d proep
   # Parol: Projson!
   ```

### **Error: Could not connect to server**

1. **pgAdmin Connection tab yoxlama:**
   - Host: `localhost` (SSH tunnel-dən sonra localhost olmalıdır)
   - Port: `5432` (PostgreSQL port)
   - Username: `pro`
   - Password: `Projson!`

2. **SSH Tunnel tab yoxlama:**
   - Remote host: `localhost` (vacib!)
   - Remote port: `5432` (PostgreSQL port)

---

## 📝 pgAdmin Connection Settings Summary

### **Connection Tab:**
```
Host name/address: localhost
Port: 5432
Maintenance database: proep
Username: pro
Password: Projson!
Save password: ✅
```

### **SSH Tunnel Tab:**
```
Use SSH tunneling: ✅
Tunnel host: 78.46.213.237
Tunnel port: 22
Username: pro
Authentication: Password (SSH parol) və ya Identity file (~/.ssh/id_rsa)
Remote host: localhost
Remote port: 5432
Local port: (boş buraxın və ya 5433)
```

---

## ✅ Test

pgAdmin-də:
1. Server sağ klikləyin
2. **"Connect Server"** seçin
3. Əgər uğurlu oldu, database-ləri görə bilərsiniz
4. **Servers → Proep Server → Databases → proep → Schemas → admin → Tables → appeal**
5. **appeal** table-a sağ klikləyin → **"View/Edit Data" → "All Rows"**

---

## 🎯 Vacib Qeydlər

1. **Host:** `localhost` yazın (SSH tunnel-dən sonra)
2. **SSH Tunnel aktivləşdirin:** ✅
3. **Remote host:** `localhost` (serverdə PostgreSQL localhost-da işləyir)
4. **Remote port:** `5432` (PostgreSQL default port)
5. **SSH Key istifadə edin** (paroldan daha təhlükəsiz)

---

## 🔐 SSH Key Setup (Tövsiyə Olunur)

**Mac-də SSH key yaratmaq və serverə copy etmək:**

```bash
# SSH key yaratmaq (əgər yoxdursa)
ssh-keygen -t rsa -b 4096 -C "proep@example.com"
# Location: ~/.ssh/id_rsa (Enter basın)
# Passphrase: (parol daxil edin və ya boş buraxın)

# SSH key serverə copy etmək
ssh-copy-id pro@78.46.213.237

# Yoxlama (parolsuz giriş etməlidir)
ssh pro@78.46.213.237
```

**pgAdmin-də SSH Key Path:**
```
/Users/emil.vahidli/.ssh/id_rsa
```
