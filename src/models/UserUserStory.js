const { DataTypes, Model } = require('sequelize');

class UserUserStory extends Model {
  static initialize(sequelize) {
    UserUserStory.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      userStoryId: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'UserUserStory',
      tableName: 'UserUserStories'
    });
  }

  static associate(models) {
    UserUserStory.belongsTo(models.User, { foreignKey: 'userId' });
    UserUserStory.belongsTo(models.UserStory, { foreignKey: 'userStoryId' });
  }
}

module.exports = UserUserStory;
