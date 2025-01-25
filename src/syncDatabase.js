const models = require('./models');
const { sequelize } = require('./models');

sequelize.sync({ force: true })
  .then(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    await models.UserUserStory.drop({ force: true });
    await models.UserStory.drop({ force: true });
    await models.User.drop({ force: true });

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    await sequelize.sync({ force: true });
    
    console.log('Database synced successfully with force: true');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1);
  });
