const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config({ path: '../../.env' });

const sequelize = new Sequelize('agilflow_mvp', 'agilflow_mvp_user', 'motown22pop', {
  host:  '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;
