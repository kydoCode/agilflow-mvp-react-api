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
            assignedToId: req.user.id, // Assign user story to the logged-in user
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
        const userId = req.user && req.user.id;
        console.log("getUserStories - userId:", userId);
        console.log("getUserStories - Filtering for userId:", userId); // Added log
        const userStories = await UserStory.findAll({
            where: { assignedToId: userId },
            include: [{ model: User, as: 'assignee', attributes: ['id', 'name', 'role'] }],
        });
        res.json(userStories);
    } catch (error) {
        console.error("Erreur dans getUserStories:", error);
        next(error);
    }
};

// Mettre à jour une User Story
exports.updateUserStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("updateUserStory - req.params.id:", id);
        console.log("updateUserStory - req.user.id:", req.user.id);
        const [updated] = await UserStory.update(req.body, {
            where: {
                id: id,
                assignedToId: req.user.id
            },
        });

        if (updated === 0) {
            return res.status(404).json({ message: 'User Story non trouvée ou n\'appartenant pas à l\'utilisateur' });
        }
        const updatedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'assignee' }] });
        res.status(200).json(updatedUserStory);
    } catch (error) {
        console.error("Erreur dans updateUserStory:", error);
        console.error("Request body:", req.body); // Log request body
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
