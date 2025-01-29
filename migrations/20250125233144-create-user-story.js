'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      role: {
        type: Sequelize.STRING,
        defaultValue: null,
        comment: 'Role of the user related to the user story'
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
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserStories');
  },
};
