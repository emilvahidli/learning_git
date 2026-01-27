#!/bin/bash
# Deployment script for new-proep
# Run on production server

set -e

echo "🚀 Starting deployment..."

# Variables
PROJECT_DIR="/home/pro/projects/new-proep"
FRONTEND_DIR="$PROJECT_DIR"
BACKEND_DIR="$PROJECT_DIR/new-proep-backend"

# Navigate to project
cd $PROJECT_DIR

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install frontend dependencies and build
echo "📦 Building frontend..."
npm install
npm run build

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd $BACKEND_DIR
npm install

# Copy production environment file
if [ -f ".env.production" ]; then
  cp .env.production .env
  echo "✅ Production environment configured"
fi

# Run migrations
echo "🔄 Running database migrations..."
npm run migrate

# Restart backend with PM2
echo "🔄 Restarting backend..."
pm2 delete new-proep-backend 2>/dev/null || true
pm2 start ecosystem.config.cjs --env production
pm2 save

echo "
✅ Deployment completed!

Frontend: https://proep.az
Backend API: https://proep.az/api
"
