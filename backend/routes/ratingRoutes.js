import express from 'express';
import { getRatings, createRating } from '../controllers/ratingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createRating);
router.route('/user/:userId').get(protect, getRatings);

export default router;
