const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const UserDefinition = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the user',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Unique email address of the user',
      validate: {
        isEmail: true,
      }
    },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Password of the user',
  },

    role: {
      type: DataTypes.ENUM('developer', 'product owner', 'tester', 'teammate', 'scrum master', 'administrator'),
      allowNull: false,
      comment: 'Role of the user (e.g., developer, product owner)',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'User' // Explicitly set table name to 'User'
  });

  User.beforeCreate(async (user) => {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(`Password hashed successfully for user: ${user.email}`); // Add logging
    } catch (error) {
      console.error(`Error hashing password for user: ${user.email}`, error); // Add error logging
      throw error; // Re-throw the error to prevent user creation
    }
  });

  User.prototype.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};

module.exports = UserDefinition;
