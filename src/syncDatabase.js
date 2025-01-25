const models = require('./models');

models.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully with force: true');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1);
  });
