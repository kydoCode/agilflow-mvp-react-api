const { UserStory, User } = require('../models');

// Créer une User Story
exports.createUserStory = async (req, res, next) => {
    try {
        const { action, need, status, priority, userIds } = req.body;

        // Validate required fields
        if (!action || !need) {
            return res.status(400).json({ error: 'Action and need are required fields.' });
        }

        const userStory = await UserStory.create({
            action,
            need,
            status: status || 'todo',
            priority: priority || 'medium',
        });

        if (userIds && userIds.length > 0) {
            const users = await User.findAll({ where: { id: userIds } });
            await userStory.addUsersInvolved(users);
        }

        res.status(201).json(userStory);
    } catch (error) {
        console.error("Error in createUserStory:", error);
        next(error);
    }
};

// Récupérer une User Story par ID
exports.getUserStoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'UsersInvolved' }] });
        if (!userStory) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        res.status(200).json(userStory);
    } catch (error) {
        next(error);
    }
};

// Récupérer toutes les User Stories
exports.getUserStories = async (req, res, next) => {
    try {
        console.log("getUserStories - req.user:", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // const userId = req.user.id; // Get user ID from verified token -- not needed anymore
        console.log("getUserStories - userId:", req.user.id);
        const userStories = await UserStory.findAll({
            // where: { assignedToId: userId }, // Filter stories by assigned user -- not needed anymore
            include: [{ model: User, as: 'UsersInvolved' }],
        });
        res.json(userStories);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour une User Story
exports.updateUserStory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [updated] = await UserStory.update({
            ...req.body,
            assignedToId: req.user.id, // Ensure assignedToId is set during update
        }, {
            where: { id },
        });

        if (!updated) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        const updatedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'UsersInvolved' }] });
        res.status(200).json(updatedUserStory);
    } catch (error) {
        next(error);
    }
};

// Supprimer une User Story
exports.deleteUserStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await UserStory.destroy({
            where: { id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        // Fetch the deleted user story with UsersInvolved before returning
        const deletedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'UsersInvolved' }] });

        // we shall return the deleted user story and message
        res.status(200).json({ message: 'User Story deleted successfully', deletedUserStory });
        // res.status(204).end();
    } catch (error) {
        next(error);
    }
};
