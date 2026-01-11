import express from 'express';
import {
  getAllMessages,
  getMessage,
  replyMessage,
  archiveMessage,
  deleteMessage
} from '../controllers/messagesController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Bütün route-lar authentication tələb edir
router.use(requireAuth);

/**
 * @route   GET /api/admin/messages
 * @desc    Bütün mesajları əldə et
 * @access  Private
 */
router.get('/', getAllMessages);

/**
 * @route   GET /api/admin/messages/:id
 * @desc    Bir mesajı əldə et
 * @access  Private
 */
router.get('/:id', getMessage);

/**
 * @route   POST /api/admin/messages/:id/reply
 * @desc    Mesaja cavab yaz
 * @access  Private
 */
router.post('/:id/reply', replyMessage);

/**
 * @route   PATCH /api/admin/messages/:id/archive
 * @desc    Mesajı arxivlə
 * @access  Private
 */
router.patch('/:id/archive', archiveMessage);

/**
 * @route   DELETE /api/admin/messages/:id
 * @desc    Mesajı sil
 * @access  Private
 */
router.delete('/:id', deleteMessage);

export default router;
