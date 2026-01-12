import express from 'express';
import { getServerStats } from '../controllers/serverStatsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/admin/server-stats
 * @desc    Server statistikalarını əldə et
 * @access  Private (Admin only)
 */
router.get('/', requireAuth, getServerStats);

export default router;
