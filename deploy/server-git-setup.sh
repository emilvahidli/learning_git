#!/bin/bash

# Proep.az Server Git Setup Script
# Serverdə işlədir - Git repo-nu clone edir və deploy hazırlayır

set -e

# Konfiqurasiya
SERVER_USER="pro"
PROJECT_DIR="/home/pro/projects/proep"
GIT_REPO="https://github.com/emilvahidli/proep.git"

echo "🚀 Proep.az Git Setup başlayır..."

# Proyekt qovluğu yaradılır
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Git clone (əgər yoxdursa)
if [ ! -d ".git" ]; then
    echo "📥 Git repo clone edilir..."
    git clone $GIT_REPO .
else
    echo "📥 Git repo mövcuddur, pull edilir..."
    git pull origin main || git pull origin master
fi

# Deploy script-i executable edilir
if [ -f "deploy/git-deploy.sh" ]; then
    chmod +x deploy/git-deploy.sh
fi

# Frontend dependencies install
if [ -d "frontend" ]; then
    echo "📦 Frontend dependencies install edilir..."
    cd frontend
    npm install
    cd ..
fi

# Backend dependencies install (əgər varsa)
if [ -d "backend" ]; then
    echo "📦 Backend dependencies install edilir..."
    cd backend
    npm install
    cd ..
fi

# Nginx konfiqurasiyası
echo "🌐 Nginx konfiqurasiyası..."
if [ -f "deploy/nginx-proep.conf" ]; then
    sudo cp deploy/nginx-proep.conf /etc/nginx/sites-available/proep.az
    if [ ! -L /etc/nginx/sites-enabled/proep.az ]; then
        sudo ln -s /etc/nginx/sites-available/proep.az /etc/nginx/sites-enabled/
    fi
    sudo nginx -t
    sudo systemctl reload nginx
fi

echo ""
echo "✅ Git setup tamamlandı!"
echo ""
echo "📋 Deploy etmək üçün:"
echo "  cd $PROJECT_DIR"
echo "  ./deploy/git-deploy.sh"
echo ""
