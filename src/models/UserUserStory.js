const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserUserStory = sequelize.define('UserUserStory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = UserUserStory;
