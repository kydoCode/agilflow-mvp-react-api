'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.UserStory, {
        through: 'UserUserStories',
        foreignKey: 'userId',
        otherKey: 'userStoryId'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the user'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Unique email address of the user'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Password of the user'
    },
    role: {
      type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
      allowNull: false,
      comment: 'Role of the user (e.g., developer, product owner)'
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
    modelName: 'User',
    tableName: 'User'
  });
  return User;
};
