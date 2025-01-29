const { DataTypes, Model } = require('sequelize');

class UserStory extends Model {
  static initialize(sequelize) {
    UserStory.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role: {
        type: DataTypes.STRING,
        comment: 'Role of the user related to the user story'
      },
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
        defaultValue: null
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    }, {
      sequelize,
      modelName: 'UserStory',
      tableName: 'UserStories',
      comment: 'Represents a User Story in the Agile workflow'
    });
  }

  static associate(models) {
    UserStory.belongsToMany(models.User, {
      through: models.UserUserStory,
      foreignKey: 'userStoryId',
      otherKey: 'userId'
    });
  }
}

module.exports = UserStory;
