const models = require('./models');
const { sequelize } = require('./models');

models.UserStory.sync({ force: true })
  .then(async () => {
    console.log('Database synced successfully with force: true for UserStory model');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1);
  });
