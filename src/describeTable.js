const { sequelize } = require('./models');

async function describeTable() {
  try {
    const tableInfo = await sequelize.query(
      'DESCRIBE UserUserStories;',
      { type: sequelize.QueryTypes.DESCRIBE }
    );
    console.log(JSON.stringify(tableInfo, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error describing table:', error);
    process.exit(1);
  }
}

describeTable();
