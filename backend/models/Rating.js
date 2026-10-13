import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Session from './Session.js';

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  revieweeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Session,
      key: 'id',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  feedback: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(Rating, { as: 'GivenRatings', foreignKey: 'reviewerId' });
User.hasMany(Rating, { as: 'ReceivedRatings', foreignKey: 'revieweeId' });
Rating.belongsTo(User, { as: 'Reviewer', foreignKey: 'reviewerId' });
Rating.belongsTo(User, { as: 'Reviewee', foreignKey: 'revieweeId' });

Session.hasMany(Rating, { foreignKey: 'sessionId' });
Rating.belongsTo(Session, { foreignKey: 'sessionId' });

export default Rating;
