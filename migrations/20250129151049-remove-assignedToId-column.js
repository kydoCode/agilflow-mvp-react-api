'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserStories', 'assignedToId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('UserStories', 'assignedToId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Add allowNull: true
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
