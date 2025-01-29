const { Sequelize } = require('sequelize');
const path = require('path');
const config = require(path.join(__dirname, '../../config/config.json'));
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user');
db.UserStory = require('./userStory');
db.UserUserStory = require('./UserUserStory');

db.User.initialize(sequelize);
db.UserStory.initialize(sequelize);
db.UserUserStory.initialize(sequelize);

db.User.associate(db);
db.UserStory.associate(db);
db.UserUserStory.associate(db);

module.exports = db;
