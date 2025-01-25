const sequelize = require('../config/database');
const User = require('./user');
const UserStory = require('./userStory');
const UserUserStory = require('./UserUserStory');

// Define associations for many-to-many relationship
User.belongsToMany(UserStory, { through: UserUserStory, as: 'CreatedUserStories', foreignKey: 'userId' });
UserStory.belongsToMany(User, { through: UserUserStory, as: 'UsersInvolved', foreignKey: 'userStoryId' });

User.hasMany(UserStory, { foreignKey: 'assignedTo', as: 'AssignedUserStories' });
UserStory.belongsTo(User, { foreignKey: 'assignedTo', as: 'Assignee' });

// Export models
module.exports = {
  sequelize,
  User,
  UserStory,
  UserUserStory, // Export the new join model
};
