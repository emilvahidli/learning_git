import express from 'express';
import { login, logout, verifyAuth, changePassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   POST /api/auth/logout
 * @desc    Admin logout
 * @access  Private
 */
router.post('/logout', requireAuth, logout);

/**
 * @route   GET /api/auth/verify
 * @desc    Token verify və admin məlumatlarını qaytar
 * @access  Private
 */
router.get('/verify', requireAuth, verifyAuth);

/**
 * @route   POST /api/auth/change-password
 * @desc    Şifrəni dəyişdir
 * @access  Private
 */
router.post('/change-password', requireAuth, changePassword);

export default router;
