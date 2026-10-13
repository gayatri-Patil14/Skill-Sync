import Achievement from '../models/Achievement.js';

export const getAchievements = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id; // Get for specific user or self
    const achievements = await Achievement.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
};

// Typically achievements might be created internally, but we can expose an endpoint for testing/admin
export const createAchievement = async (req, res) => {
  try {
    const { userId, title, description, icon } = req.body;
    const achievement = await Achievement.create({
      userId,
      title,
      description,
      icon,
    });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating achievement', error: error.message });
  }
};
