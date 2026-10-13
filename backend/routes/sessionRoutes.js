import express from 'express';
import { getSessions, createSession, updateSessionStatus } from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSessions)
  .post(protect, createSession);

router.route('/:id/status').put(protect, updateSessionStatus);

export default router;
