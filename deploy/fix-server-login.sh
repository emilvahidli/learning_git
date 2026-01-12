#!/bin/bash

# Server Login Problemi - Fix Script
# Bu script serverdə login problemlərini həll edir

set -e

echo "🔧 Server Login Fix başlayır..."
echo ""

# 1. Admin user yarat/yenilə
echo "1️⃣  Admin user yaradılır/yenilənir..."
cd /home/pro/projects/proep/backend
npm run create-admin

echo ""
echo "2️⃣  Backend restart edilir..."
pm2 restart proep-backend || pm2 start src/server.js --name proep-backend
pm2 save

echo ""
echo "3️⃣  Nginx reload edilir..."
sudo systemctl reload nginx

echo ""
echo "✅ Fix tamamlandı!"
echo ""
echo "📋 Test etmək üçün:"
echo "   - https://admin.proep.az - Admin panel"
echo "   - Username: emil.vahidli"
echo "   - Password: Projson!"
echo ""
echo "🔍 Logları yoxlamaq üçün:"
echo "   pm2 logs proep-backend"
