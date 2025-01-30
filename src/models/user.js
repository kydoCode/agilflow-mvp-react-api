const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static initialize(sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the user'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Unique email address of the user'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Password of the user'
      },
      role: {
        type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
        allowNull: false,
        comment: 'Role of the user (e.g., developer, product owner)'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'User',
      comment: 'Represents a user in the system',
      hooks: {
        beforeValidate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    });
  }

  static associate(models) {
    User.belongsToMany(models.UserStory, {
      through: models.UserUserStory,
      foreignKey: 'userId',
      otherKey: 'userStoryId'
    });
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

module.exports = User;
