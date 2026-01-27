import express from 'express';
import { trackClick, getClickStats } from '../controllers/clickController.js';

const router = express.Router();

// POST /api/click - Track link click
router.post('/click', trackClick);

// GET /api/clicks - Get click statistics (admin)
router.get('/clicks', getClickStats);

export default router;
