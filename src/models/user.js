const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Name of the user',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Unique email address of the user',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Password of the user',
  },
  role: {
    type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
    allowNull: false,
    comment: 'Role of the user (e.g., developer, product owner)',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  tableName: 'User',
  comment: 'Represents a user in the system'
});

User.associate = (models) => {
  User.belongsToMany(models.UserStory, {
    through: models.UserUserStory,
    foreignKey: 'userId',
    otherKey: 'userStoryId',
    as: 'userStories'
  });
};


module.exports = User;
