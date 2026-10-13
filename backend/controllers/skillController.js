import Skill from '../models/Skill.js';
import User from '../models/User.js';

// @desc    Create a new skill
// @route   POST /api/skills/create
// @access  Private
const createSkill = async (req, res, next) => {
  const { skillName, skillDescription, category, type, proficiencyLevel, availability } = req.body;

  try {
    const skill = await Skill.create({
      userId: req.user.id,
      skillName,
      skillDescription,
      category,
      type,
      proficiencyLevel,
      availability,
    });

    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all skills
// @route   GET /api/skills/all
// @access  Public
const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll({
      include: [{ model: User, attributes: ['name', 'college'] }],
    });
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    Get skill by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'college', 'bio'] }],
    });

    if (skill) {
      res.json(skill);
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);

    if (skill) {
      if (skill.userId !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to update this skill');
      }

      skill.skillName = req.body.skillName || skill.skillName;
      skill.skillDescription = req.body.skillDescription || skill.skillDescription;
      skill.category = req.body.category || skill.category;
      skill.type = req.body.type || skill.type;
      skill.proficiencyLevel = req.body.proficiencyLevel || skill.proficiencyLevel;
      skill.availability = req.body.availability || skill.availability;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);

    if (skill) {
      if (skill.userId !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to delete this skill');
      }

      await skill.destroy();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404);
      throw new Error('Skill not found');
    }
  } catch (error) {
    next(error);
  }
};

export { createSkill, getAllSkills, getSkillById, updateSkill, deleteSkill };
