'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserStories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'What the user wants to do'
      },
      need: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Reason or benefit for the action'
      },
      status: {
        type: Sequelize.ENUM('todo', 'doing', 'done'),
        allowNull: false,
        defaultValue: 'todo',
        comment: 'Current status of the User Story'
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
        comment: 'Priority level of the User Story'
      },
      role: {
        type: Sequelize.STRING,
        comment: 'Role of the user related to the user story'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      comment: 'Represents a User Story in the Agile workflow'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserStories');
  }
};
