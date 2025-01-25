const sequelize = require('../config/database');
const UserUserStory = require('./UserUserStory'); // Import the join table model
const User = require('./user');
const UserStory = require('./userStory');


// Define associations after models are imported
UserStory.belongsTo(User, {
  foreignKey: 'assignedTo',
  as: 'assignee'
});
User.hasMany(UserStory, {
  foreignKey: 'assignedTo',
  as: 'AssignedUserStories'
});


// Export models
module.exports = {
  sequelize,
  UserUserStory, // Export the join table model
  User,
  UserStory,
};
