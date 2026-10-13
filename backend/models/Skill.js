import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  skillName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skillDescription: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('offer', 'request'),
    defaultValue: 'offer',
  },
  proficiencyLevel: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Expert'),
    defaultValue: 'Beginner',
  },
  availability: {
    type: DataTypes.STRING,
  },
});

// Associations
User.hasMany(Skill, { foreignKey: 'userId', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'userId' });

export default Skill;
