#!/bin/bash

# Proep.az Server Setup Script
# Ubuntu server üçün hazırlıq script-i

set -e

echo "🚀 Proep.az Server Setup başlayır..."

# System update
echo "📦 System update edilir..."
sudo apt update && sudo apt upgrade -y

# Əsas paketlər
echo "📦 Əsas paketlər quraşdırılır..."
sudo apt install -y curl wget git build-essential software-properties-common

# Nginx quraşdırılması
echo "🌐 Nginx quraşdırılır..."
sudo apt install -y nginx

# Nginx status
sudo systemctl enable nginx
sudo systemctl start nginx

# Node.js 20.x quraşdırılması (LTS)
echo "📦 Node.js quraşdırılır..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Node.js versiyasını yoxla
echo "✅ Node.js versiyası:"
node --version
npm --version

# PM2 quraşdırılması (backend üçün)
echo "📦 PM2 quraşdırılır..."
sudo npm install -g pm2

# PM2 startup script
pm2 startup systemd -u $USER --hp /home/$USER

# Certbot quraşdırılması (SSL üçün)
echo "🔒 Certbot quraşdırılır..."
sudo apt install -y certbot python3-certbot-nginx

# Firewall konfiqurasiyası
echo "🔥 Firewall konfiqurasiya edilir..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Git konfiqurasiyası (əgər lazımsa)
echo "📝 Git konfiqurasiyası..."
read -p "Git user.name daxil edin (boş buraxmaq olar): " git_name
if [ ! -z "$git_name" ]; then
    git config --global user.name "$git_name"
fi

read -p "Git user.email daxil edin (boş buraxmaq olar): " git_email
if [ ! -z "$git_email" ]; then
    git config --global user.email "$git_email"
fi

# Proyekt qovluğu yaradılır
echo "📁 Proyekt qovluğu yaradılır..."
mkdir -p ~/projects/proep
cd ~/projects/proep

echo ""
echo "✅ Server setup tamamlandı!"
echo ""
echo "📋 Növbəti addımlar:"
echo "1. Domain DNS qeydlərini yoxlayın"
echo "2. Nginx konfiqurasiyasını quraşdırın: sudo nano /etc/nginx/sites-available/proep.az"
echo "3. SSL sertifikatı alın: sudo certbot --nginx -d proep.az -d www.proep.az"
echo "4. Frontend deploy edin"
echo ""
