const express = require('express');
const userStoriesController = require('../controllers/userStoriesController');

const router = express.Router();

// Routes CRUD
router.post('/', userStoriesController.createUserStory); // Créer une user story
router.get('/', userStoriesController.getUserStories); // Obtenir toutes les user stories
router.get('/:id', userStoriesController.getUserStoryById); // Obtenir une user story par ID
router.put('/:id', userStoriesController.updateUserStory); // Mettre à jour une user story
router.delete('/:id', userStoriesController.deleteUserStory); // Supprimer une user story

module.exports = router;
