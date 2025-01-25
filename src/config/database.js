const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306, /* 3307*/
});

module.exports = sequelize;
