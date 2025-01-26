require('dotenv').config({ path: '[PATH_REDACTED]/gitProjects/06_DWWM/Projects/11/agilflow-mpv-react/agilflow-mvp-react/back/my-express-api/api/.env' });
console.log('process.env: ', process.env);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_PORT:', process.env.DB_PORT);


const models = require('./models');
const { sequelize } = require('./models');

sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => models.UserUserStory.drop({ force: true }))
  .then(() => models.UserStory.drop({ force: true }))
  .then(() => models.User.drop({ force: true }))
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => models.User.sync({ force: true }))
  .then(() => models.UserStory.sync({ force: true }))
  .then(() => models.UserUserStory.sync({ force: true }))
  .then(async () => {
    console.log('Database synced successfully with force: true for all models');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASS:", process.env.DB_PASS);
    console.log("DB_PORT:", process.env.DB_PORT);
    process.exit(1);
  });
