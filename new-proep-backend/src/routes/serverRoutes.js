import express from 'express';
import { getServerStats } from '../controllers/serverController.js';

const router = express.Router();

router.get('/server-stats', getServerStats);

export default router;
