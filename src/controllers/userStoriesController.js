const { UserStory, User } = require('../models');

// Créer une User Story
exports.createUserStory = async (req, res, next) => {
    try {
        console.log('createUserStory - req.user:', req.user);
        console.log('createUserStory - req.body:', req.body);
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
        console.log('createUserStory - userStory:', userStory);


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

// Récupérer toutes les User Stories (filtré par userId si fourni)
exports.getUserStories = async (req, res, next) => {
    try {
        const userId = req.query.userId; // Only consider userId from query parameter
        const whereClause = userId ? { assignedToId: userId } : {}; // Add where clause only if userId is provided

        const userStories = await UserStory.findAll({
            where: whereClause, // Apply the where clause
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
        console.log('updateUserStory - req.params:', req.params);
        console.log('updateUserStory - req.body:', req.body);
        const { id } = req.params;

        const updateData = { ...req.body };
        // Remove unconditional assignedToId update
        const [updated] = await UserStory.update(updateData, {
            where: { id },
        });
        console.log('updateUserStory - updated:', updated);


        if (!updated) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        const updatedUserStory = await UserStory.findByPk(id, { include: [{ model: User, as: 'assignee' }] });
        console.log('updateUserStory - updatedUserStory:', updatedUserStory);
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
