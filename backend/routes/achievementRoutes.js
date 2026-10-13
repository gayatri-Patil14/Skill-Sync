import express from 'express';
import { getAchievements, createAchievement } from '../controllers/achievementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createAchievement); // Might be protected to admin in real app
router.route('/:userId?').get(protect, getAchievements);

export default router;
