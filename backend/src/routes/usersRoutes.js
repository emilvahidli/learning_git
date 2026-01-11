import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/usersController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Bütün route-lar authentication tələb edir
router.use(requireAuth);

/**
 * @route   GET /api/admin/users
 * @desc    Bütün istifadəçiləri əldə et
 * @access  Private
 */
router.get('/', getAllUsers);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Bir istifadəçini əldə et
 * @access  Private
 */
router.get('/:id', getUser);

/**
 * @route   POST /api/admin/users
 * @desc    Yeni istifadəçi yarat
 * @access  Private
 */
router.post('/', createUser);

/**
 * @route   PUT /api/admin/users/:id
 * @desc    İstifadəçini yenilə
 * @access  Private
 */
router.put('/:id', updateUser);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    İstifadəçini sil
 * @access  Private
 */
router.delete('/:id', deleteUser);

export default router;
