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
      UserStory.belongsToMany(models.User, {
        through: 'UserUserStories',
        foreignKey: 'userStoryId',
        otherKey: 'userId'
      });
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
      defaultValue: 'todo',
      comment: 'Current status of the User Story'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
      comment: 'Priority level of the User Story'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'UserStories',
    tableName: 'UserStories'
  });
  return UserStory;
};
