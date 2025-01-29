'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserUserStories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id'
        },
        onDelete: 'CASCADE' 
      },
      userStoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserStories', 
          key: 'id'
        },
        onDelete: 'CASCADE' 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserUserStories');
  }
};
