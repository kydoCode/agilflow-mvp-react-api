const { sequelize, UserStory: UserStoryModel, User: UserModel, UserUserStory: UserUserStoryModel } = require('../models');

exports.createUserStory = async (req, res, next) => {
  try {
    const { action, need, role, priority, status } = req.body;
    const userStory = await UserStoryModel.create({ action, need, role, priority, status });

    // Associate the user story with the logged-in user
    await UserUserStoryModel.create({
      userId: req.user.id,
      userStoryId: userStory.id,
      role: 'creator', // You can set a default role like 'creator'
    });

    res.status(201).json(userStory);
  } catch (error) {
    next(error);
  }
};

exports.getUserStories = async (req, res, next) => {
    try {
        // const userId = req.user.id; // No need to explicitly get userId, it's already in req.user
        console.log("Backend - getUserStories - userId:", req.user.id);
        const user = await UserModel.findByPk(req.user.id, {
            include: [{
                model: UserStoryModel,
                as: 'UserStories',
                through: { attributes: [] }
            }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const stories = user.UserStories;
        res.json(stories);
    } catch (error) {
        next(error);
    }
};


exports.getUserStoryById = async (req, res, next) => {
  try {
    const userStory = await UserStoryModel.findByPk(req.params.id, {
      include: [{ model: UserModel, as: 'users' }]
    });
    if (!userStory) {
      return res.status(404).json({ message: 'User story not found' });
    }
    res.json(userStory);
  } catch (error) {
    next(error);
  }
};

exports.updateUserStory = async (req, res, next) => {
  try {
    const { action, need, role, priority, status } = req.body;
    const userStory = await UserStoryModel.findByPk(req.params.id);
    if (!userStory) {
      return res.status(404).json({ message: 'User story not found' });
    }
    await userStory.update({ action, need, role, priority, status });
    const updatedUserStory = await UserStoryModel.findByPk(req.params.id); // Fetch updated story
    res.json({ message: 'User story updated successfully', userStory: updatedUserStory }); // Return updated story
  } catch (error) {
    next(error);
  }
};

exports.deleteUserStory = async (req, res, next) => {
  try {
    const userStory = await UserStoryModel.findByPk(req.params.id);
    if (!userStory) {
      return res.status(404).json({ message: 'User story not found' });
    }
    await userStory.destroy();
    res.json({ message: 'User story deleted successfully' });
  } catch (error) {
    next(error);
  }
};
