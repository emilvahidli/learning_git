# Proep.az Backend API

Node.js + Express + PostgreSQL backend API for Proep.az

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Mac: `brew install node`, Server: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`)
- PostgreSQL 14+ (Mac: `brew install postgresql@14`, Server: `sudo apt-get install postgresql postgresql-contrib`)

## 📦 Installation

### Mac:

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

### Server (Ubuntu):

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm start
# Or use PM2: pm2 start src/server.js --name proep-backend
```

## 🗄️ Database Setup

### Mac:

```bash
# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Create database and user
createdb proep
psql postgres
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
\q

# Run migration
npm run migrate
```

### Server (Ubuntu):

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE proep;
CREATE USER pro WITH PASSWORD 'Projson!';
GRANT ALL PRIVILEGES ON DATABASE proep TO pro;
ALTER DATABASE proep OWNER TO pro;
\q

# Run migration
npm run migrate
```

## 📋 API Endpoints

### POST /api/appeal

Create a new appeal/contact message.

**Request Body:**
```json
{
  "mail": "user@example.com",
  "phone_number": "+994501234567",
  "appeal": 1,
  "name": "John Doe",
  "message": "Hello, I would like to contact you..."
}
```

**Validation Rules:**
- `mail`: Required, valid email format
- `phone_number`: Required, 1-50 characters
- `appeal`: Required, integer 1-5 (enum)
- `name`: Required, 1-30 characters
- `message`: Required, 1-2000 characters

**Response (201):**
```json
{
  "success": true,
  "message": "Appeal created successfully",
  "data": {
    "id": 1,
    "created_date": "2026-01-10T12:00:00.000Z",
    "mail": "user@example.com",
    "phone_number": "+994501234567",
    "appeal": 1,
    "name": "John Doe",
    "message": "Hello, I would like to contact you..."
  }
}
```

### GET /api/appeal

Get all appeals (for admin).

**Response (200):**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### GET /health

Health check endpoint.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is healthy",
  "database": "connected",
  "timestamp": "2026-01-10T12:00:00.000Z"
}
```

## 🗃️ Database Schema

### admin.appeal

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| created_date | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| mail | VARCHAR(255) | NOT NULL |
| phone_number | VARCHAR(50) | NOT NULL |
| appeal | INTEGER | NOT NULL, CHECK (appeal IN (1, 2, 3, 4, 5)) |
| name | VARCHAR(30) | NOT NULL, CHECK (LENGTH(name) <= 30) |
| message | TEXT | NOT NULL, CHECK (LENGTH(message) <= 2000) |

**Indexes:**
- `idx_appeal_created_date` on `created_date` (DESC)
- `idx_appeal_mail` on `mail`

## 🔧 Environment Variables

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proep
DB_USER=pro
DB_PASSWORD=Projson!
FRONTEND_URL=http://localhost:5173
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migration

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run migration
npm run migrate

# Start development server
npm run dev
```

## 🚀 Production

### Using PM2 (Server):

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start src/server.js --name proep-backend

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Using systemd (Server):

Create `/etc/systemd/system/proep-backend.service`:

```ini
[Unit]
Description=Proep Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=pro
WorkingDirectory=/home/pro/projects/proep/backend
ExecStart=/usr/bin/node src/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable proep-backend
sudo systemctl start proep-backend
```
