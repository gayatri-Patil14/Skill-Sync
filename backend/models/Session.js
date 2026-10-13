import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Skill from './Skill.js';

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  skillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Skill,
      key: 'id',
    },
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in minutes
    allowNull: false,
    defaultValue: 60,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled',
  },
  meetingLink: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Session, { as: 'RequestedSessions', foreignKey: 'requesterId' });
User.hasMany(Session, { as: 'ProvidedSessions', foreignKey: 'providerId' });
Session.belongsTo(User, { as: 'Requester', foreignKey: 'requesterId' });
Session.belongsTo(User, { as: 'Provider', foreignKey: 'providerId' });
Session.belongsTo(Skill, { foreignKey: 'skillId' });

export default Session;
