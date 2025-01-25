const sequelize = require('../config/database');
const User = require('./user');
const UserStory = require('./userStory');

// Define associations after models are imported
User.belongsToMany(UserStory, { through: 'UserUserStory', as: 'CreatedUserStories', foreignKey: 'userId' });
UserStory.belongsToMany(User, { through: 'UserUserStory', as: 'UsersInvolved', foreignKey: 'userStoryId' });

User.hasMany(UserStory, { foreignKey: 'assignedTo', as: 'AssignedUserStories' });
UserStory.belongsTo(User, { foreignKey: 'assignedTo', as: 'Assignee' });

// Export models
module.exports = {
  sequelize,
  User,
  UserStory,
};
