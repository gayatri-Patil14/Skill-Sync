import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Skill from './Skill.js';

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiverId: {
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
  message: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
});

// Associations
User.hasMany(Request, { as: 'SentRequests', foreignKey: 'senderId' });
User.hasMany(Request, { as: 'ReceivedRequests', foreignKey: 'receiverId' });
Request.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Request.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });
Request.belongsTo(Skill, { foreignKey: 'skillId' });

export default Request;
