import express from 'express';
import {
  sendRequest,
  getMyRequests,
  updateRequestStatus,
} from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, sendRequest);
router.get('/my', protect, getMyRequests);
router.put('/:id', protect, updateRequestStatus);

export default router;
