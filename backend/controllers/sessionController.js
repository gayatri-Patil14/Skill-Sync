import Session from '../models/Session.js';
import User from '../models/User.js';
import Skill from '../models/Skill.js';
import { Op } from 'sequelize';

export const getSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await Session.findAll({
      where: {
        [Op.or]: [{ requesterId: userId }, { providerId: userId }],
      },
      include: [
        { model: User, as: 'Requester', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'Provider', attributes: ['id', 'name', 'email'] },
        { model: Skill, attributes: ['id', 'skillName'] },
      ],
      order: [['scheduledAt', 'DESC']],
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
};

export const createSession = async (req, res) => {
  try {
    const { providerId, skillId, scheduledAt, duration, meetingLink } = req.body;
    const requesterId = req.user.id;

    const session = await Session.create({
      requesterId,
      providerId,
      skillId,
      scheduledAt,
      duration,
      meetingLink,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error: error.message });
  }
};

export const updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, meetingLink } = req.body;

    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.requesterId !== req.user.id && session.providerId !== req.user.id) {
       return res.status(403).json({ message: 'Not authorized' });
    }

    session.status = status || session.status;
    session.meetingLink = meetingLink || session.meetingLink;

    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error updating session', error: error.message });
  }
};
