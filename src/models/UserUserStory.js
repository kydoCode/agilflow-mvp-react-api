const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserUserStory = sequelize.define('UserUserStory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { // Explicitly define userId foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Reference the User model by name
        key: 'id',   // Reference the User model's primary key
      }
    },
    userStoryId: { // Explicitly define userStoryId foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'UserStory', // Reference the UserStory model by name
        key: 'id',      // Reference the UserStory model's primary key
      }
    },
    role: {
      type: DataTypes.ENUM('assignee', 'creator'),
      allowNull: false,
    },
  }, {
    tableName: 'users_user_stories', 
    timestamps: false,
    underscored: true,
  });

  return UserUserStory;
};
