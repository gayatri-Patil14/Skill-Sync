import Request from '../models/Request.js';
import Skill from '../models/Skill.js';
import User from '../models/User.js';

// @desc    Send a skill exchange request
// @route   POST /api/requests/send
// @access  Private
const sendRequest = async (req, res, next) => {
  const { receiverId, skillId, message } = req.body;

  try {
    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }

    const request = await Request.create({
      senderId: req.user.id,
      receiverId,
      skillId,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's requests (both sent and received)
// @route   GET /api/requests/my
// @access  Private
const getMyRequests = async (req, res, next) => {
  try {
    const sentRequests = await Request.findAll({
      where: { senderId: req.user.id },
      include: [
        { model: User, as: 'Receiver', attributes: ['name', 'email'] },
        { model: Skill, attributes: ['skillName'] },
      ],
    });

    const receivedRequests = await Request.findAll({
      where: { receiverId: req.user.id },
      include: [
        { model: User, as: 'Sender', attributes: ['name', 'email'] },
        { model: Skill, attributes: ['skillName'] },
      ],
    });

    res.json({ sent: sentRequests, received: receivedRequests });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status (accept/reject)
// @route   PUT /api/requests/:id
// @access  Private
const updateRequestStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const request = await Request.findByPk(req.params.id);

    if (request) {
      if (request.receiverId !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to update this request');
      }

      request.status = status || request.status;
      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error('Request not found');
    }
  } catch (error) {
    next(error);
  }
};

export { sendRequest, getMyRequests, updateRequestStatus };
