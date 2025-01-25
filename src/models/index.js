const sequelize = require('../config/database');
const UserDefinition = require('./user');
const UserStoryDefinition = require('./userStory');
const UserUserStoryDefinition = require('./UserUserStory');

const User = UserDefinition(sequelize);
const UserStory = UserStoryDefinition(sequelize);
const UserUserStory = UserUserStoryDefinition(sequelize);

const models = {
  sequelize,
  User,
  UserStory,
  UserUserStory,
};

User.hasMany(UserStory, { 
  foreignKey: 'assignedTo',
  as: 'assignedUserStories',
});
User.belongsToMany(UserStory, { 
    through: UserUserStory,
    as: 'userStories',
    foreignKey: 'userId'
});
UserStory.belongsTo(User, { 
  foreignKey: 'assignedTo',
  as: 'assignee'
});
UserStory.belongsToMany(User, { 
    through: UserUserStory,
    as: 'users',
    foreignKey: 'userStoryId'
});

module.exports = models;
