'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserUserStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserUserStory.init({
    userId: DataTypes.INTEGER,
    userStoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserUserStory',
  });
  return UserUserStory;
};