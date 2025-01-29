const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserStoryDefinition = (sequelize) => {
    const UserStory = sequelize.define('UserStory', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true, // Role is optional
            comment: 'Role of the user related to the user story',
        },
    }, {
        comment: 'Represents a User Story in the Agile workflow',
    });

    return UserStory;
};

module.exports = (sequelize) => {
  const UserStory = UserStoryDefinition(sequelize);

    UserStory.associate = (models) => {
        UserStory.belongsToMany(models.User, {
            through: models.UserUserStory,
            foreignKey: 'userStoryId',
            otherKey: 'userId',
            as: 'users'
        });
    };

  return UserStory;
};
