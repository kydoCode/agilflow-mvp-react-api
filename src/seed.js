// require('dotenv').config();
require('dotenv').config({ path: '../.env' }); // Utiliser le fichier .env du dossier parent -> écris le path
const sequelize = require('./config/database');
const models = require('./models');
const User = models.User;
const UserStory = models.UserStory;

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

async function seedDatabase() {
  try {
    console.log('Attempting to sync models with the database...');
    await sequelize.sync();
    console.log('Models synced successfully!');

    console.log('Creating user John Doe...');
    const user1 = await User.create({
      name: 'John Doe',
      role: 'developer',
      email: 'john.doe@example.com',
      password: 'password123', // In real life, hash the password!
    });
    console.log('User created:', user1);

    console.log('Creating user Jane Smith...');
    const user2 = await User.create({
      name: 'Jane Smith',
      role: 'developer',
      email: 'jane.smith@example.com',
      password: 'password456', // In real life, hash the password!
    });
    console.log('User created:', user2);

    console.log('Creating user story for user1...');
    const userStory1 = await UserStory.create({
      title: 'As a user, I can log in',
      description: 'So that I can access my dashboard',
      status: 'todo',
      priority: 'High',
      userId: user1.id,
      user: 'developer',
      action: 'log in',
      need: 'access my dashboard',
    });
    console.log('User story created:', userStory1);

    console.log('Creating user story for user2...');
    const userStory2 = await UserStory.create({
      title: 'As a user, I can create a user story',
      description: 'So that I can manage my tasks',
      status: 'doing',
      priority: 'Medium',
      userId: user2.id,
      user: 'product owner',
      action: 'create a user story',
      need: 'manage my tasks',
    });
    console.log('User story created:', userStory2);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    console.log('Closing database connection...');
    await sequelize.close();
  }
}

seedDatabase();
