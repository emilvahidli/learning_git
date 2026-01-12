#!/bin/bash

# Server Table Setup Script
# Admin table-larını yaradır

set -e

echo "🔧 Server table setup başlayır..."
echo ""

cd /home/pro/projects/proep/backend

# Admin tables yarat
echo "📊 Admin tables yaradılır..."
npm run create-tables

echo ""
echo "✅ Table setup tamamlandı!"
echo ""
echo "🔄 Backend restart edilir..."
pm2 restart proep-backend

echo ""
echo "✅ Tamamlandı! Backend loglarını yoxlayın:"
echo "   pm2 logs proep-backend --lines 50"
