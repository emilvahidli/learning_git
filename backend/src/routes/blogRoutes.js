import express from 'express';
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  publishPost,
  deletePost,
  getCategories
} from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Bütün route-lar authentication tələb edir
router.use(requireAuth);

/**
 * @route   GET /api/admin/blog
 * @desc    Bütün blog postları
 * @access  Private
 */
router.get('/', getAllPosts);

/**
 * @route   GET /api/admin/blog/categories
 * @desc    Blog kateqoriyaları
 * @access  Private
 */
router.get('/categories', getCategories);

/**
 * @route   GET /api/admin/blog/:id
 * @desc    Bir post əldə et (ID və ya post_id)
 * @access  Private
 */
router.get('/:id', getPost);

/**
 * @route   POST /api/admin/blog
 * @desc    Yeni post yarat
 * @access  Private
 */
router.post('/', createPost);

/**
 * @route   PUT /api/admin/blog/:id
 * @desc    Post-u yenilə
 * @access  Private
 */
router.put('/:id', updatePost);

/**
 * @route   PATCH /api/admin/blog/:id/publish
 * @desc    Post-u publish et
 * @access  Private
 */
router.patch('/:id/publish', publishPost);

/**
 * @route   DELETE /api/admin/blog/:id
 * @desc    Post-u sil
 * @access  Private
 */
router.delete('/:id', deletePost);

export default router;
