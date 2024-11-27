const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserStory = require('./userStory');

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
  role: {
    type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
    allowNull: false,
    comment: 'Role of the user (e.g., developer, product owner)',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
