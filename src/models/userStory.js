const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
}, {
    tableName: 'UserStories',
    comment: 'Represents a User Story in the Agile workflow',
});


UserStory.associate = (models) => {
    UserStory.belongsToMany(models.User, {
        through: 'UserUserStory', // Name of the join table
        as: 'UsersInvolved',     // Alias for UserStory.getUsersInvolved(), UserStory.setUsersInvolved(), UserStory.addUsersInvolved(), UserStory.removeUsersInvolved()
        foreignKey: 'userStoryId', // Foreign key in the UserUserStory table referencing UserStory
    });
    UserStory.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee',
    });
};


module.exports = UserStory;
