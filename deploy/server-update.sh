#!/bin/bash

# Server Update Script
# Git pull etdikdən sonra işlədir

set -e

echo "🔄 Server update başlayır..."
echo ""

# 1. Backend restart
echo "1️⃣  Backend restart edilir..."
cd /home/pro/projects/proep/backend
pm2 restart proep-backend || pm2 start src/server.js --name proep-backend
pm2 save
echo "✅ Backend restart tamamlandı"
echo ""

# 2. Admin panel build
echo "2️⃣  Admin panel build edilir..."
cd /home/pro/projects/proep/admin-panel
npm install 2>/dev/null || true  # Əgər lazımsa dependencies install
npm run build
echo "✅ Admin panel build tamamlandı"
echo ""

# 3. Frontend build (əgər dəyişiklik varsa)
echo "3️⃣  Frontend build edilir..."
cd /home/pro/projects/proep/frontend
npm install 2>/dev/null || true  # Əgər lazımsa dependencies install
npm run build
echo "✅ Frontend build tamamlandı"
echo ""

# 4. Nginx reload
echo "4️⃣  Nginx reload edilir..."
sudo systemctl reload nginx
echo "✅ Nginx reload tamamlandı"
echo ""

echo "🎉 Server update tamamlandı!"
echo ""
echo "📋 Yoxlamaq üçün:"
echo "   - https://admin.proep.az - Admin panel"
echo "   - https://proep.az - Frontend"
echo "   - pm2 logs proep-backend - Backend logları"
