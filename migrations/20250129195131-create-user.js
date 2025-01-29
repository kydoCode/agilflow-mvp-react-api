'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Name of the user'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Unique email address of the user'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Password of the user'
      },
      role: {
        type: Sequelize.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
        allowNull: false,
        comment: 'Role of the user (e.g., developer, product owner)'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
