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

db.User = require('./user')(sequelize);
db.UserStory = require('./userStory')(sequelize);
db.UserUserStory = require('./UserUserStory')(sequelize);

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
