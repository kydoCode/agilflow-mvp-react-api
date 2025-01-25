require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/user');
const UserStory = require('./models/userStory');

async function seedDatabase() {
  try {
    await sequelize.sync(); // Sync models with the database

    // Create some users
    const user1 = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', // In real life, hash the password!
    });

    const user2 = await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456', // In real life, hash the password!
    });

    // Create some user stories
    await UserStory.create({
      title: 'As a user, I can log in',
      description: 'So that I can access my dashboard',
      status: 'To Do',
      priority: 'High',
      userId: user1.id, // Assign to user1
    });

    await UserStory.create({
      title: 'As a user, I can create a user story',
      description: 'So that I can manage my tasks',
      status: 'In Progress',
      priority: 'Medium',
      userId: user2.id, // Assign to user2
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
