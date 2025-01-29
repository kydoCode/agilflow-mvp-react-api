const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserUserStory = sequelize.define('UserUserStory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  userStoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'UserUserStories', 
});

UserUserStory.associate = (models) => {
  UserUserStory.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  UserUserStory.belongsTo(models.UserStory, { foreignKey: 'userStoryId', as: 'userStory' });
};

module.exports = UserUserStory;
