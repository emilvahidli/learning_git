# Git ilə Manual Deploy Təlimatı

## Local-dan Serverə Deploy

---

## Metod 1: Git Pull (Serverdə)

### Local-dan:
```bash
# 1. Dəyişiklikləri commit edin
cd /Users/emil.vahidli/Projects/proep
git add .
git commit -m "Frontend updates"
git push origin main
```

### Serverdə:
```bash
# 2. Serverə qoşulun
ssh pro@78.46.213.237

# 3. Proyekt qovluğuna keçin
cd ~/projects/proep

# 4. Git pull edin
git pull origin main

# 5. Frontend build edin
cd frontend
npm install
npm run build

# 6. Nginx reload
sudo systemctl reload nginx
```

---

## Metod 2: Deploy Script İstifadə (Tövsiyə olunur)

### Local-dan:
```bash
# 1. Commit və push
cd /Users/emil.vahidli/Projects/proep
git add .
git commit -m "Update"
git push origin main
```

### Serverdə:
```bash
# 2. Deploy script işlədin
ssh pro@78.46.213.237
cd ~/projects/projects/proep
./deploy/git-deploy.sh
```

Bu script avtomatik olaraq:
- Git pull edir
- Frontend build edir
- Nginx reload edir

---

## Metod 3: Local-dan Birbaşa Deploy (rsync)

### Local-dan:
```bash
cd /Users/emil.vahidli/Projects/proep

# 1. Frontend build edin
cd frontend
npm run build
cd ..

# 2. Serverə yükləyin
rsync -avz --delete \
    frontend/dist/ \
    pro@78.46.213.237:/home/pro/projects/proep/frontend/dist/

# 3. Serverdə Nginx reload
ssh pro@78.46.213.237 "sudo systemctl reload nginx"
```

---

## Addım-Addım: Ətraflı Manual Deploy

### 1. Local-dan Dəyişiklikləri Push Edin

```bash
# Proyekt qovluğuna keçin
cd /Users/emil.vahidli/Projects/proep

# Status yoxlayın
git status

# Dəyişiklikləri əlavə edin
git add .

# Commit edin
git commit -m "Frontend updates - [təsvir]"

# GitHub-a push edin
git push origin main
```

**Nümunə commit mesajları:**
```bash
git commit -m "Add new services page"
git commit -m "Fix navigation bug"
git commit -m "Update contact form"
git commit -m "Add blog posts"
```

---

### 2. Serverdə Git Pull

```bash
# Serverə qoşulun
ssh pro@78.46.213.237

# Proyekt qovluğuna keçin
cd ~/projects/proep

# Git status yoxlayın
git status

# Son commit-ləri görün
git log --oneline -5

# Pull edin
git pull origin main
```

**Əgər conflict varsa:**
```bash
# Conflict həll edin
git status
# Conflict olan faylları redaktə edin
git add .
git commit -m "Resolve conflicts"
```

---

### 3. Frontend Build

```bash
# Frontend qovluğuna keçin
cd ~/projects/proep/frontend

# Dependencies yoxlayın (əgər package.json dəyişibsə)
npm install

# Build edin
npm run build

# Build uğurlu oldu?
ls -la dist/
```

**Build problemləri:**
```bash
# Node modules təmizləyin
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### 4. Nginx Reload

```bash
# Nginx config test
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Status yoxlama
sudo systemctl status nginx
```

---

### 5. Yoxlama

```bash
# Site açılır?
curl -I http://proep.az

# Və ya browser-də açın
# http://proep.az

# Logs yoxlama
sudo tail -f /var/log/nginx/proep-access.log
```

---

## Quick Deploy (Bir Sətirdə)

### Serverdə:
```bash
cd ~/projects/proep && git pull origin main && cd frontend && npm run build && sudo systemctl reload nginx
```

---

## Rollback (Əvvəlki Versiyaya Qayıtmaq)

### Serverdə:
```bash
cd ~/projects/proep

# Commit history görün
git log --oneline -10

# Əvvəlki commit-ə qayıdın
git checkout <commit-hash>
# və ya
git checkout HEAD~1

# Frontend build
cd frontend
npm run build

# Nginx reload
sudo systemctl reload nginx
```

---

## Git Branch İstifadəsi

### Development branch yaratmaq:
```bash
# Local-dan
git checkout -b development
git push origin development

# Serverdə test etmək
cd ~/projects/proep
git checkout development
git pull origin development
cd frontend && npm run build
```

---

## Troubleshooting

### Git Pull Problem
```bash
# Local dəyişikliklər var?
git status

# Stash edin
git stash
git pull origin main
git stash pop
```

### Build Problem
```bash
cd ~/projects/proep/frontend
rm -rf node_modules dist
npm install
npm run build
```

### Permission Problem
```bash
sudo chown -R pro:pro ~/projects/proep
sudo chmod -R 755 ~/projects/proep/frontend/dist
```

---

## Best Practices

1. **Hər dəfə deploy-dan əvvəl test edin:**
   ```bash
   npm run build
   npm run preview  # Local test
   ```

2. **Mənalı commit mesajları yazın:**
   ```bash
   git commit -m "Fix: Navigation menu mobile bug"
   git commit -m "Feature: Add contact form validation"
   ```

3. **Deploy-dan əvvəl git status yoxlayın:**
   ```bash
   git status
   git diff  # Nə dəyişib görün
   ```

4. **Deploy-dan sonra yoxlama edin:**
   ```bash
   curl -I https://proep.az
   # Browser-də test edin
   ```
