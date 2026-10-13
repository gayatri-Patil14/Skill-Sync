import Rating from '../models/Rating.js';
import Session from '../models/Session.js';
import User from '../models/User.js';

export const getRatings = async (req, res) => {
  try {
    const { userId } = req.params; // Get ratings for a specific user

    const ratings = await Rating.findAll({
      where: { revieweeId: userId },
      include: [
        { model: User, as: 'Reviewer', attributes: ['id', 'name'] },
        { model: Session, attributes: ['id', 'skillId'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error: error.message });
  }
};

export const createRating = async (req, res) => {
  try {
    const { revieweeId, sessionId, score, feedback } = req.body;
    const reviewerId = req.user.id;

    // Optional: Verify session exists and is completed
    const session = await Session.findByPk(sessionId);
    if (!session || session.status !== 'completed') {
      return res.status(400).json({ message: 'Valid completed session required' });
    }

    const rating = await Rating.create({
      reviewerId,
      revieweeId,
      sessionId,
      score,
      feedback,
    });

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error: error.message });
  }
};
