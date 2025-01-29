'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserStory.init({
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'What the user wants to do'
    },
    need: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Reason or benefit for the action'
    },
    role: {
      type: DataTypes.STRING,
      comment: 'Role of the user related to the user story'
    },
    status: {
      type: DataTypes.ENUM('todo', 'doing', 'done'),
      allowNull: false,
      defaultValue: DataTypes.STRING,
      comment: 'Current status of the User Story'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: DataTypes.STRING,
      comment: 'Priority level of the User Story'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'UserStories',
    tableName: 'UserStories' // Correct table name to 'UserStories'
  });
  return UserStory;
};
