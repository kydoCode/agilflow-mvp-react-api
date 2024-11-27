const sequelize = require('../config/database');
const User = require('./user');
const UserStory = require('./userStory');

// Définir les relations
UserStory.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
User.hasMany(UserStory, { foreignKey: 'assignedTo', as: 'userStories' });

// Exporter les modèles
module.exports = {
  sequelize,
  User,
  UserStory,
};
