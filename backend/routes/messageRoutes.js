import express from 'express';
import { getMessages, sendMessage, markAsRead } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:userId').get(protect, getMessages);
router.route('/read/:senderId').put(protect, markAsRead);

export default router;
