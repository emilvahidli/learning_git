#!/bin/bash

# ============================================
# Proep Project - Cleanup və Deploy Script
# ============================================

echo "🧹 Prosesə təsir etməyən fayllar silinir..."

# 1. Documentation faylları (root level)
echo "📄 Root level documentation faylları silinir..."
rm -f BACKEND-DEPLOY.md
rm -f BACKEND-ERROR-FIX.md
rm -f BACKEND-SERVER-SETUP.md
rm -f BACKEND-TROUBLESHOOTING.md
rm -f DEPLOY-NOW.md
rm -f DEPLOY.md
rm -f FRONTEND-BACKEND-INTEGRATION.md
rm -f GOOGLE-INDEXING.md
rm -f GOOGLE-SEARCH-CONSOLE-FIX.md
rm -f GOOGLE-SEARCH-CONSOLE.md
rm -f LOCAL-POSTGRES-CONNECTION.md
rm -f NGINX-405-FIX.md
rm -f PGADMIN-SETUP.md
rm -f PGADMIN-SSH-KEY-SETUP.md
rm -f PRODUCTION-API-FIX.md
rm -f TELEGRAM-DEBUG.md
rm -f TELEGRAM-HOW-IT-WORKS.md
rm -f TELEGRAM-SERVER-CHECK.md
rm -f TELEGRAM-SETUP.md
rm -f VIKUNJA-SETUP.md

# 2. Backend documentation
echo "📄 Backend documentation faylları silinir..."
rm -f backend/ADMIN-AUTH-SETUP.md
rm -f backend/MAC-SETUP.md
rm -f backend/SETUP.md
rm -f backend/README.md

# 3. Frontend documentation
echo "📄 Frontend documentation faylları silinir..."
rm -f frontend/DEPLOYMENT.md
rm -f frontend/README.md

# 4. Admin panel documentation
echo "📄 Admin panel documentation faylları silinir..."
rm -f admin-panel/ATTRIBUTIONS.md
rm -f admin-panel/IMPLEMENTATION-STATUS.md
rm -rf admin-panel/guidelines
rm -f admin-panel/README.md

# 5. Deploy documentation
echo "📄 Deploy documentation faylları silinir..."
rm -f deploy/MANUAL-DEPLOY.md
rm -f deploy/SERVER-STEPS.md
rm -f deploy/README.md

# 6. Köhnə/demo fayllar (admin-panel)
echo "🗑️  Admin panel köhnə/demo faylları silinir..."
rm -f admin-panel/src/app/screens/Login.tsx
rm -f admin-panel/src/app/screens/LoginDarkMode.tsx
rm -f admin-panel/src/app/screens/LoginDemo.tsx
rm -f admin-panel/src/app/screens/LoginGlassmorphism.tsx
rm -f admin-panel/src/app/screens/LoginMinimal.tsx
rm -f admin-panel/src/app/screens/LoginSplitScreen.tsx
rm -f admin-panel/src/app/screens/Dashboard.tsx
rm -f admin-panel/src/app/screens/Messages.tsx
rm -f admin-panel/src/app/screens/Users.tsx
rm -f admin-panel/src/app/screens/Blog.tsx
rm -f admin-panel/src/app/App.tsx  # ProepApp.tsx istifadə olunur

# 7. Köhnə frontend fayllar
echo "🗑️  Frontend köhnə faylları silinir..."
rm -f frontend/src/App.jsx  # App.tsx istifadə olunur
rm -f frontend/src/main.jsx  # main.tsx istifadə olunur

# 8. One-time setup scriptləri
echo "🗑️  One-time setup scriptləri silinir..."
rm -f setup-ssh-key.sh
rm -f tunnel-postgres.sh

# 9. Design file (production-a lazım deyil)
echo "🗑️  Design file silinir..."
rm -rf "design file"

echo ""
echo "✅ Təmizləmə tamamlandı!"
echo ""
echo "📦 Git commit və push üçün əmrlər:"
echo "==========================================="
echo ""
echo "# 1. Dəyişiklikləri yoxla"
echo "git status"
echo ""
echo "# 2. Bütün dəyişiklikləri əlavə et"
echo "git add ."
echo ""
echo "# 3. Commit et"
echo "git commit -m 'Cleanup: Prosesə təsir etməyən fayllar silindi'"
echo ""
echo "# 4. Push et"
echo "git push origin main"
echo ""
echo "==========================================="
echo "🖥️  Serverdə pull üçün əmrlər:"
echo "==========================================="
echo ""
echo "# 1. Server-ə bağlan"
echo "ssh user@your-server-ip"
echo ""
echo "# 2. Project qovluğuna get"
echo "cd /path/to/proep"
echo ""
echo "# 3. Git pull et"
echo "git pull origin main"
echo ""
echo "# 4. Backend dependencies yenilə (əgər lazımsa)"
echo "cd backend && npm install"
echo ""
echo "# 5. Frontend dependencies yenilə (əgər lazımsa)"
echo "cd ../frontend && npm install"
echo ""
echo "# 6. Admin panel dependencies yenilə (əgər lazımsa)"
echo "cd ../admin-panel && npm install"
echo ""
echo "# 7. Backend restart et (PM2 ilə)"
echo "cd ../backend && pm2 restart proep-backend"
echo ""
echo "# 8. Frontend build et (production üçün)"
echo "cd ../frontend && npm run build"
echo ""
echo "# 9. Admin panel build et (production üçün)"
echo "cd ../admin-panel && npm run build"
echo ""
