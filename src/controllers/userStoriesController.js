const { UserStory, User } = require('../models');

// Créer une User Story
exports.createUserStory = async (req, res, next) => {
    try {
        const { action, need, status, priority, userIds, role } = req.body;

        // Validate required fields
        if (!action || !need) {
            return res.status(400).json({ error: 'Action and need are required fields.' });
        }

        const userStory = await UserStory.create({
            role,
            action,
            need,
            status: status || 'todo',
            priority: priority || 'medium',
            assignedToId: req.user ? req.user.id : null, // Assign user story to the logged-in user if available, otherwise set to null
        });

        if (userIds && userIds.length > 0) {
            const users = await User.findAll({ where: { id: userIds } });
            await userStory.addUsersInvolved(users);
        }

        res.status(201).json({...userStory.toJSON(), id: userStory.id});
    } catch (error) {
        console.error("Error in createUserStory:", error);
        next(error);
    }
};

// Récupérer une User Story par ID
exports.getUserStoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'assignee' }] });
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
        // const userId = req.user.id;
        const userStories = await UserStory.findAll({
            include: [{ model: User, as: 'assignee', attributes: ['id', 'name', 'role'] }],
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

        const updateData = { ...req.body };
        if (req.user) {
            updateData.assignedToId = req.user.id; // Only set assignedToId if user is logged in
        }
        const [updated] = await UserStory.update(updateData, {
            where: { id },
        });

        if (!updated) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        const updatedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'assignee' }] });
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
        const deletedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'assignee' }] });

        // we shall return the deleted user story and message
        res.status(200).json({ message: 'User Story deleted successfully', deletedUserStory });
        // res.status(204).end();
    } catch (error) {
        next(error);
    }
};
