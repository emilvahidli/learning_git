import express from 'express';
import { createAppeal, getAllAppeals } from '../controllers/appealController.js';

const router = express.Router();

// POST /api/appeal - Create new appeal
router.post('/appeal', createAppeal);

// GET /api/appeals - Get all appeals (admin)
router.get('/appeals', getAllAppeals);

export default router;
