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
    assignedTo: { // Explicitly define assignedTo as a column
        type: DataTypes.INTEGER,
            allowNull: true, // Or false, depending on requirements
            references: {
              model: 'User', // Name of the User model
              key: 'id',       // Primary key of the User model
            },
            onDelete: 'SET NULL', // Or 'CASCADE', 'RESTRICT', etc.
            onUpdate: 'CASCADE',
          },
}, {
    tableName: 'UserStories',
    comment: 'Represents a User Story in the Agile workflow',
});




module.exports = UserStory;
