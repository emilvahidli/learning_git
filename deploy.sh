#!/bin/bash
# Deployment script for new-proep
# Run on production server at /home/pro/projects/new-proep

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting New-Proep Deployment...${NC}"

# Variables
PROJECT_DIR="/home/pro/projects/new-proep"
FRONTEND_DIR="$PROJECT_DIR"
BACKEND_DIR="$PROJECT_DIR/new-proep-backend"
PM2_APP_NAME="new-proep-backend"

# Navigate to project
cd $PROJECT_DIR || { echo -e "${RED}❌ Project directory not found${NC}"; exit 1; }

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin main

# Install frontend dependencies and build
echo -e "${YELLOW}📦 Building frontend...${NC}"
npm install
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Frontend build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Frontend built successfully${NC}"

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd $BACKEND_DIR
npm install

# Setup environment
if [ -f ".env.production" ]; then
    cp .env.production .env
    echo -e "${GREEN}✓ Production environment configured${NC}"
else
    echo -e "${YELLOW}⚠️  No .env.production found, using existing .env${NC}"
fi

# Run database migrations if script exists
if [ -f "src/config/migrate.js" ]; then
    echo -e "${YELLOW}🔄 Running database migrations...${NC}"
    npm run migrate || echo -e "${YELLOW}⚠️  Migration script not available or failed${NC}"
fi

# Restart backend with PM2
echo -e "${YELLOW}🔄 Restarting backend with PM2...${NC}"
pm2 delete $PM2_APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.cjs --env production
pm2 save

# Verify backend is running
sleep 2
if pm2 list | grep -q "$PM2_APP_NAME.*online"; then
    echo -e "${GREEN}✓ Backend started successfully${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    pm2 logs $PM2_APP_NAME --lines 20
    exit 1
fi

# Test backend health
echo -e "${YELLOW}🏥 Testing backend health...${NC}"
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend health check passed${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    exit 1
fi

echo -e "
${GREEN}✅ Deployment completed successfully!${NC}

📊 Status:
  Frontend: ${GREEN}Built${NC} → /home/pro/projects/new-proep/dist
  Backend:  ${GREEN}Running${NC} on port 3001
  PM2:      ${GREEN}Active${NC}

🌐 URLs:
  Frontend: https://proep.az
  Backend:  https://proep.az/api
  Health:   http://localhost:3001/health

📝 Useful commands:
  pm2 logs $PM2_APP_NAME       - View logs
  pm2 restart $PM2_APP_NAME    - Restart backend
  pm2 monit                    - Monitor resources
"
