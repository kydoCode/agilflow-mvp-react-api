require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/user');
const UserStory = require('./models/userStory');
console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);


async function seedDatabase() {
  try {
    await sequelize.sync(); // Sync models with the database

    // Create some users
    const user1 = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      role: 'developer',
      email: 'john.doe@example.com',
      password: 'password123', // In real life, hash the password!
    });

    const user2 = await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      name: 'Jane Smith',
      role: 'developer',
      email: 'jane.smith@example.com',
      password: 'password456', // In real life, hash the password!
    });

    // Create some user stories
    await UserStory.create({
      title: 'As a user, I can log in',
      description: 'So that I can access my dashboard',
      status: 'To Do',
      priority: 'High',
      userId: user1.id,
      user: 'developer', // Added user type
      action: 'log in', // Added action
      need: 'access my dashboard' // Added need
    });

    await UserStory.create({
      title: 'As a user, I can create a user story',
      description: 'So that I can manage my tasks',
      status: 'In Progress',
      priority: 'Medium',
      userId: user2.id,
      user: 'product owner', // Added user type
      action: 'create a user story', // Added action
      need: 'manage my tasks' // Added need
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
