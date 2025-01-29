'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserStory.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    storyPoints: DataTypes.INTEGER,
    acceptanceCriteria: DataTypes.TEXT,
    assignedToId: DataTypes.INTEGER // Updated to assignedToId
  }, {
    sequelize,
    modelName: 'UserStory',
  });
  return UserStory;
};
