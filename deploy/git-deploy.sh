#!/bin/bash

# Proep.az Git-based Deploy Script
# Serverdə işlədir - GitHub-dan pull edib deploy edir

set -e

# Konfiqurasiya
PROJECT_DIR="/home/pro/projects/proep"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
GIT_REPO="https://github.com/emilvahidli/proep.git"

# Rənglər
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 Proep.az Git Deploy${NC}"
echo ""

# Proyekt qovluğuna keç
cd $PROJECT_DIR

# Git pull
echo -e "${YELLOW}📥 Git pull edilir...${NC}"
git pull origin main || git pull origin master

# Frontend build
if [ -d "$FRONTEND_DIR" ]; then
    echo -e "${YELLOW}📦 Frontend build edilir...${NC}"
    cd $FRONTEND_DIR
    
    # Dependencies install
    npm install --production=false
    
    # Build
    npm run build
    
    if [ ! -d "dist" ]; then
        echo -e "${RED}❌ Frontend build uğursuz oldu!${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Frontend build tamamlandı${NC}"
fi

# Backend (əgər varsa)
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${YELLOW}📦 Backend restart edilir...${NC}"
    cd $BACKEND_DIR
    
    # Dependencies install
    npm install --production
    
    # PM2 restart
    pm2 restart proep-backend || pm2 start src/server.js --name proep-backend
    pm2 save
    
    echo -e "${GREEN}✅ Backend restart tamamlandı${NC}"
fi

# Nginx reload
echo -e "${YELLOW}🔄 Nginx reload edilir...${NC}"
sudo systemctl reload nginx

echo ""
echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
echo -e "${GREEN}🌐 https://proep.az${NC}"
