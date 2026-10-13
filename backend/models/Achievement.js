import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Achievement = sequelize.define('Achievement', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING, // e.g., 'star', 'award', 'trophy'
    allowNull: false,
  },
});

User.hasMany(Achievement, { foreignKey: 'userId', onDelete: 'CASCADE' });
Achievement.belongsTo(User, { foreignKey: 'userId' });

export default Achievement;
