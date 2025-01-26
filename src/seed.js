// require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Utiliser le fichier .env du dossier parent -> écris le path
const sequelize = require('./config/database');
const models = require('./models');
const User = models.User;
const UserStory = models.UserStory;

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

async function seedDatabase() {
  try {
    console.log('Attempting to sync models with the database...');
    await sequelize.sync();
    console.log('Models synced successfully!');

    console.log('Creating user John Doe...');
    let user1 = await User.findOne({ where: { email: 'john.doe@example.com' } });
    if (!user1) {
      user1 = await User.create({
        name: 'John Doe',
        role: 'developer',
        email: 'john.doe@example.com',
        password: 'password123', // In real life, hash the password!
      });
      console.log('User created:', user1);
    } else {
      console.log('User John Doe already exists:', user1.id);
    }

    console.log('Creating user Jane Smith...');
    let user2 = await User.findOne({ where: { email: 'jane.smith@example.com' } });
    if (!user2) {
      user2 = await User.create({
        name: 'Jane Smith',
        role: 'developer',
        email: 'jane.smith@example.com',
        password: 'password456', // In real life, hash the password!
      });
      console.log('User created:', user2);
    } else {
      console.log('User Jane Smith already exists:', user2.id);
    }

    console.log('Creating user story for user1...');
    const userStory1 = await UserStory.create({
      title: 'As a user, I can log in',
      description: 'So that I can access my dashboard',
      status: 'todo',
      priority: 'High',
      userId: user1.id,
      role: 'developer',
      action: 'log in',
      need: 'access my dashboard',
      assignedToId: user2.id, 
    });
    console.log('User story created:', userStory1);

    console.log('Creating user story for user2...');
    const userStory2 = await UserStory.create({
      title: 'As a user, I can create a user story',
      description: 'So that I can manage my tasks',
      status: 'doing',
      priority: 'Medium',
      userId: user2.id,
      role: 'product owner',
      action: 'create a user story',
      need: 'manage my tasks',
      assignedToId: user1.id,
    });
    console.log('User story created:', userStory2);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('Full error object:', error); // Log the entire error object for inspection
  } finally {
    console.log('Closing database connection...');
    await sequelize.close();
  }
}

seedDatabase();
