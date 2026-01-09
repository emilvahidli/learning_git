#!/bin/bash

# Proep.az Frontend Deploy Script
# Local-dan serverə deploy etmək üçün

set -e

# Konfiqurasiya
SERVER_USER="pro"
SERVER_HOST=""  # Server IP və ya domain
SERVER_PATH="/home/pro/projects/proep"
FRONTEND_PATH="./frontend"

# Rənglər
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Proep.az Frontend Deploy${NC}"
echo ""

# Server host soruşulur
if [ -z "$SERVER_HOST" ]; then
    read -p "Server IP və ya domain daxil edin: " SERVER_HOST
fi

# Frontend build
echo -e "${YELLOW}📦 Frontend build edilir...${NC}"
cd $FRONTEND_PATH
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build uğursuz oldu!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build tamamlandı${NC}"
echo ""

# Serverə yükləmə
echo -e "${YELLOW}📤 Serverə yüklənir...${NC}"
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    dist/ \
    ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/frontend/dist/

# Nginx reload
echo -e "${YELLOW}🔄 Nginx reload edilir...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "sudo systemctl reload nginx"

echo ""
echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
echo -e "${GREEN}🌐 https://proep.az${NC}"
