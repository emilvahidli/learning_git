import express from 'express';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  publishProject,
  deleteProject,
  getCategories
} from '../controllers/portfolioController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Bütün route-lar authentication tələb edir
router.use(requireAuth);

/**
 * @route   GET /api/admin/portfolio
 * @desc    Bütün portfolio layihələri
 * @access  Private
 */
router.get('/', getAllProjects);

/**
 * @route   GET /api/admin/portfolio/categories
 * @desc    Portfolio kateqoriyaları
 * @access  Private
 */
router.get('/categories', getCategories);

/**
 * @route   GET /api/admin/portfolio/:id
 * @desc    Bir layihə əldə et
 * @access  Private
 */
router.get('/:id', getProject);

/**
 * @route   POST /api/admin/portfolio
 * @desc    Yeni layihə yarat
 * @access  Private
 */
router.post('/', createProject);

/**
 * @route   PUT /api/admin/portfolio/:id
 * @desc    Layihəni yenilə
 * @access  Private
 */
router.put('/:id', updateProject);

/**
 * @route   PATCH /api/admin/portfolio/:id/publish
 * @desc    Layihəni publish et
 * @access  Private
 */
router.patch('/:id/publish', publishProject);

/**
 * @route   DELETE /api/admin/portfolio/:id
 * @desc    Layihəni sil
 * @access  Private
 */
router.delete('/:id', deleteProject);

export default router;
