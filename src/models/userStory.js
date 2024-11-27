const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserStory = sequelize.define('UserStory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
    allowNull: false,
    comment: 'Type of user (e.g., developer, product owner)', 
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'What the user wants to do',
  },
  need: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Reason or benefit for the action',
  },
  status: {
    type: DataTypes.ENUM('todo', 'doing', 'done'),
    allowNull: false,
    defaultValue: 'todo',
    comment: 'Current status of the User Story',
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'medium',
    comment: 'Priority level of the User Story',
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    comment: 'ID of the user assigned to this story',
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

module.exports = UserStory;
