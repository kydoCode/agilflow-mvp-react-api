const express = require('express');
const router = express.Router();
const userStoriesController = require('../controllers/userStoriesController');
const authMiddleware = require('../middlewares/auth');
const { validateUserStory } = require('../middlewares/validationMiddleware')

// Routes CRUD

router.use(authMiddleware);
router.get('/', userStoriesController.getUserStories); // Obtenir toutes les user stories
router.get('/:id', userStoriesController.getUserStoryById); // Obtenir une user story par ID
router.post('/', validateUserStory, userStoriesController.createUserStory); // Créer une user story
router.put('/:id', validateUserStory, userStoriesController.updateUserStory); // Mettre à jour une user story
router.delete('/:id', userStoriesController.deleteUserStory); // Supprimer une user story

module.exports = router;
