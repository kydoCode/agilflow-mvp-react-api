'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserStories', 'assignedToId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('UserStories', 'assignedToId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the Users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
