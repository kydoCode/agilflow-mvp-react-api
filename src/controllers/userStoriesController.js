const { UserStory, User } = require('../models');

// Créer une User Story
exports.createUserStory = async (req, res, next) => {
    try {
        const { user, action, need, status, priority, assignedTo } = req.body;
        
        // Validate required fields
        if (!user || !action || !need) {
        return res.status(400).json({ error: 'User , action, and need are required fields.' });
        }
        
        const userStory = await UserStory.create({
            user,
            action,
            need,
            status: status || 'todo', // Exemple de valeur par défaut pour le statut
            priority: priority || 'medium', // Exemple de valeur par défaut pour la priorité
            assignedTo,
        });
        res.status(201).json(userStory);
    } catch (error) {
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
        const userId = req.user.id; // Get user ID from verified token
        const userStories = await UserStory.findAll({
            where: { assignedTo: userId }, // Filter stories by assigned user
            include: [{ model: User, as: 'assignee' }],
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

        const [updated] = await UserStory.update(req.body, {
            where: { id },
        });

        if (!updated) {
            return res.status(404).json({ message: 'User Story not found' });
        }
        const updatedUserStory = await UserStory.findByPk(id);
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
        // we shall return the deleted user story and message
        res.status(200).json({ message: 'User Story deleted successfully', deleted });
        // res.status(204).end();
    } catch (error) {
        next(error);
    }
};
