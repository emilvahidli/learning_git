# New Proep - Modern Website for Proep.az

Modern, responsive website for Proep.az built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- React Router v7
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**
- Node.js (ES Modules)
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs (password hashing)

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- ⚡ Fast page loads with Vite
- 🔐 Secure admin authentication
- 📊 Admin dashboard
- 📝 Contact form with appeal tracking
- 📈 Link click analytics
- 🎯 Dynamic menu management

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev  # Runs on http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
cd new-proep-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run migrate

# Start development server
npm run dev  # Runs on http://localhost:3001

# Start production server
npm start
```

### Environment Variables

**Frontend** (`.env.production`):
```
VITE_GA_MEASUREMENT_ID=your-google-analytics-id
VITE_API_URL=https://proep.az/api
```

**Backend** (`new-proep-backend/.env.production`):
```
PORT=3001
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_USER=pro
DB_PASSWORD=your-password
DB_NAME=proep
JWT_SECRET=your-secret-key
FRONTEND_URL=https://proep.az
```

## Production Deployment

### Server Requirements
- Ubuntu 20.04+ or similar
- Node.js 18+
- PostgreSQL
- Nginx
- PM2 (for process management)
- SSL certificate for proep.az

### Deployment Steps

1. **Clone repository on server:**
```bash
cd /home/pro/projects
git clone <repository-url> new-proep
cd new-proep
```

2. **Configure environment:**
```bash
# Frontend
cp .env.production.example .env.production
# Edit with production values

# Backend
cd new-proep-backend
cp .env.production.example .env.production
# Edit with production database credentials and JWT secret
```

3. **Run deployment script:**
```bash
chmod +x deploy.sh
./deploy.sh
```

4. **Configure Nginx:**
```bash
sudo cp nginx-proep.conf /etc/nginx/sites-available/proep.az.conf
sudo ln -s /etc/nginx/sites-available/proep.az.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Verify deployment:**
```bash
# Check backend
pm2 list
pm2 logs new-proep-backend

# Test endpoints
curl http://localhost:3001/health
curl https://proep.az/api/health

# Visit website
# https://proep.az
```

### Manual Deployment

If you prefer manual deployment:

**Frontend:**
```bash
npm install
npm run build
# Built files in dist/
```

**Backend:**
```bash
cd new-proep-backend
npm install
pm2 start ecosystem.config.cjs --env production
pm2 save
```

## Project Structure

```
new-proep/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── styles/            # CSS files
├── new-proep-backend/     # Backend API
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── scripts/       # Utility scripts
│   │   └── server.js      # Entry point
│   └── ecosystem.config.cjs  # PM2 config
├── public/                # Static assets
├── dist/                  # Production build
├── deploy.sh             # Deployment script
└── nginx-proep.conf      # Nginx configuration
```

## API Endpoints

### Public Endpoints
- `POST /api/appeal` - Submit contact form
- `POST /api/click` - Track link click
- `GET /health` - Health check

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/appeals` - List all appeals
- `GET /api/clicks` - Get click statistics
- `GET /api/admin/menus` - Get menu structure
- `POST /api/admin/menus` - Create menu item
- `PUT /api/admin/menus/:id` - Update menu item
- `DELETE /api/admin/menus/:id` - Delete menu item

## Database Schema

**Tables:**
- `appeals` - Contact form submissions
- `link_clicks` - Click tracking data
- `admin_users` - Admin accounts
- `admin_menus` - Dynamic menu structure

## Troubleshooting

### Frontend not building
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend not starting
```bash
pm2 logs new-proep-backend --lines 50
# Check for database connection errors
```

### Database connection issues
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check credentials in `.env`
- Ensure database `proep` exists

### PM2 commands
```bash
pm2 list                        # List all processes
pm2 logs new-proep-backend      # View logs
pm2 restart new-proep-backend   # Restart
pm2 stop new-proep-backend      # Stop
pm2 delete new-proep-backend    # Remove from PM2
pm2 monit                       # Monitor resources
```

## License

Private project for Proep.az

## Author

Emil Vahidli
