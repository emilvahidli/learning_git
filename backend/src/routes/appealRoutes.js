import express from 'express';
import { createAppeal, getAllAppeals } from '../controllers/appealController.js';
import { validateAppeal } from '../middleware/validation.js';

const router = express.Router();

// POST /api/appeal - Create new appeal
router.post('/', validateAppeal, createAppeal);

// GET /api/appeal - Get all appeals (for admin)
router.get('/', getAllAppeals);

export default router;
