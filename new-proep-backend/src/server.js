import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import appealRoutes from './routes/appealRoutes.js';
import clickRoutes from './routes/clickRoutes.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import serverRoutes from './routes/serverRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5174',
        'https://proep.az',
        'https://www.proep.az',
        'http://localhost:3000' // Existing backend just in case
    ],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', appealRoutes);
app.use('/api', clickRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/menus', menuRoutes);
app.use('/api/admin', usersRoutes);
app.use('/api/admin', serverRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 New Proep Backend Server
━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Port: ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
⏰ Started: ${new Date().toISOString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Endpoints:
  POST /api/appeal    - Submit contact form
  GET  /api/appeals   - List appeals (admin)
  POST /api/click     - Track link click
  GET  /api/clicks    - Click statistics (admin)
  GET  /health        - Health check
  `);
});

export default app;
