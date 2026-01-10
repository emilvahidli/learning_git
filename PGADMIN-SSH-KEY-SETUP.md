# pgAdmin SSH Key Setup - Addım-Addım

## 🎯 pgAdmin-də SSH Tunnel Setup (SSH Key ilə)

pgAdmin 4-də SSH tunnel funksiyası var. SSH tunnel script açmadan birbaşa pgAdmin-dən qoşula bilərsiniz.

---

## 📋 1. SSH Key Yaratmaq (Mac-də)

### **SSH Key Yaratmaq:**

```bash
# SSH key yaratmaq
ssh-keygen -t rsa -b 4096 -C "proep@example.com"

# Soruşanda:
# Enter file in which to save the key: [Enter basın] (~/.ssh/id_rsa)
# Enter passphrase: [Parol daxil edin və ya Enter basın (boş)]
# Enter same passphrase again: [Təkrar parol və ya Enter]
```

**SSH key yaradıldı:**
- Private key: `~/.ssh/id_rsa`
- Public key: `~/.ssh/id_rsa.pub`

### **SSH Key Serverə Copy Etmək:**

```bash
# SSH key serverə copy etmək
ssh-copy-id pro@78.46.213.237

# Və ya manual:
cat ~/.ssh/id_rsa.pub | ssh pro@78.46.213.237 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

**Yoxlama:**
```bash
# Parolsuz giriş etməlidir
ssh pro@78.46.213.237
```

---

## 📋 2. pgAdmin-də Server Setup

### **Addım 1: Yeni Server Yaratmaq**

1. **pgAdmin açın**
2. **Sol panel-də "Servers" sağ klikləyin**
3. **"Register" → "Server..."** seçin

### **Addım 2: General Tab**

- **Name:** `Proep Server` (və ya istədiyiniz ad)
- **Server group:** `Servers`
- **Comments:** (boş qoyula bilər)

### **Addım 3: Connection Tab**

**Connection Details:**
- **Host name/address:** `localhost` ✅ (vacib! SSH tunnel-dən sonra localhost)
- **Port:** `5432` ✅ (PostgreSQL port)
- **Maintenance database:** `proep`
- **Username:** `pro`
- **Password:** `Projson!`
- **Save password:** ✅ (parolu saxlayır)

**⚠️ Vacib:** Host kimi `localhost` yazın, `78.46.213.237` deyil! SSH tunnel bunu avtomatik idarə edir.

### **Addım 4: SSH Tunnel Tab (Vacib!)**

**SSH Tunnel aktivləşdirmək:**
- **Use SSH tunneling:** ✅ (işarələyin!)

**SSH Connection Settings:**
- **Tunnel host:** `78.46.213.237` (server IP)
- **Tunnel port:** `22` (SSH port)
- **Username:** `pro` (SSH username)

**Authentication (SSH Key istifadə edin):**
- **Identity file:** `/Users/emil.vahidli/.ssh/id_rsa` (SSH private key path)
- **Passphrase:** (əgər SSH key parol varsa, yoxdursa boş buraxın)

**Və ya Password (SSH parol):**
- **Password:** SSH parolunuz (pro user-in SSH parolu)

**Tunnel Settings:**
- **Remote host:** `localhost` ✅ (vacib! Serverdə PostgreSQL localhost-da işləyir)
- **Remote port:** `5432` ✅ (PostgreSQL port)
- **Local port:** (boş buraxın, pgAdmin avtomatik tapa bilər və ya `5433` yazın)

### **Addım 5: Save**

**"Save"** klikləyin.

---

## ✅ Test

pgAdmin-də:
1. Server sağ klikləyin
2. **"Connect Server"** seçin
3. Əgər uğurlu oldu, server açılacaq və database-ləri görə bilərsiniz
4. **Servers → Proep Server → Databases → proep → Schemas → admin → Tables → appeal**
5. **appeal** table-a sağ klikləyin → **"View/Edit Data" → "All Rows"**

---

## 📝 pgAdmin Connection Settings Summary

### **General Tab:**
```
Name: Proep Server
```

### **Connection Tab:**
```
Host name/address: localhost ✅ (vacib!)
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

Authentication (SSH Key):
Identity file: /Users/emil.vahidli/.ssh/id_rsa
Passphrase: (boş və ya SSH key parol)

Tunnel Settings:
Remote host: localhost ✅ (vacib!)
Remote port: 5432
Local port: (boş və ya 5433)
```

---

## 🔧 Troubleshooting

### **Error: SSH tunnel failed**

1. **SSH connection test:**
   ```bash
   ssh pro@78.46.213.237
   # Parolsuz giriş etməlidir (SSH key işləyirsə)
   ```

2. **SSH key path yoxlama:**
   ```bash
   ls -la ~/.ssh/id_rsa
   # Fayl mövcud olmalıdır
   ```

3. **pgAdmin-də SSH Tunnel Settings yoxlama:**
   - Tunnel host: `78.46.213.237` (IP düzgündürmü?)
   - Tunnel port: `22` (SSH port düzgündürmü?)
   - Username: `pro` (SSH username düzgündürmü?)
   - Identity file: `/Users/emil.vahidli/.ssh/id_rsa` (path düzgündürmü?)

### **Error: Could not connect to server**

1. **pgAdmin Connection tab yoxlama:**
   - Host: `localhost` (SSH tunnel-dən sonra localhost olmalıdır)
   - Port: `5432` (PostgreSQL port)

2. **pgAdmin SSH Tunnel tab yoxlama:**
   - Remote host: `localhost` (vacib!)
   - Remote port: `5432` (PostgreSQL port)

### **Error: Password authentication failed**

1. **Serverdə PostgreSQL connection test:**
   ```bash
   ssh pro@78.46.213.237
   psql -h localhost -U pro -d proep
   # Parol: Projson!
   ```

2. **pgAdmin Connection tab-da parol yoxlama:**
   - Password: `Projson!`

---

## 🎯 Vacib Qeydlər

1. **Host kimi `localhost` yazın** (SSH tunnel-dən sonra)
2. **SSH Tunnel aktivləşdirin:** ✅
3. **Remote host:** `localhost` (serverdə PostgreSQL localhost-da işləyir)
4. **Remote port:** `5432` (PostgreSQL default port)
5. **SSH Key path:** `/Users/emil.vahidli/.ssh/id_rsa` (tam path)

---

## ✅ Quick Setup Commands

### **1. SSH Key Yaratmaq:**

```bash
ssh-keygen -t rsa -b 4096 -C "proep@example.com"
# Enter basın (default location)
# Passphrase: (parol daxil edin və ya Enter basın)
```

### **2. SSH Key Serverə Copy Etmək:**

```bash
ssh-copy-id pro@78.46.213.237
# Və ya parol daxil edin (bir dəfə)
```

### **3. Yoxlama:**

```bash
# Parolsuz giriş etməlidir
ssh pro@78.46.213.237
```

### **4. pgAdmin-də Setup:**

1. **Servers → Register → Server**
2. **Connection Tab:**
   - Host: `localhost`
   - Port: `5432`
   - Database: `proep`
   - Username: `pro`
   - Password: `Projson!`
3. **SSH Tunnel Tab:**
   - Use SSH tunneling: ✅
   - Tunnel host: `78.46.213.237`
   - Tunnel port: `22`
   - Username: `pro`
   - Identity file: `/Users/emil.vahidli/.ssh/id_rsa`
   - Remote host: `localhost`
   - Remote port: `5432`

---

**İndi SSH key yaradın və pgAdmin-də setup edin. Test edin və nəticəni bildirin!**
