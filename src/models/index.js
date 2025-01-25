const sequelize = require('../config/database');
const User = require('./user');
const UserStory = require('./userStory');
const UserUserStory = require('./UserUserStory');

const models = {
  sequelize,
  User,
  UserStory,
  UserUserStory,
};

User.associate = (models) => {
    User.hasMany(models.UserStory, {
      foreignKey: 'assignedTo',
      as: 'assignedUserStories',
    });
    User.belongsToMany(models.UserStory, {
        through: 'UserUserStory',
        as: 'userStories',
        foreignKey: 'userId'
    });
  };

UserStory.associate = (models) => {
    UserStory.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee'
    });
    UserStory.belongsToMany(models.User, {
        through: 'UserUserStory',
        as: 'users',
        foreignKey: 'userStoryId'
    });
};


User.associate(models);
UserStory.associate(models);


module.exports = models;
