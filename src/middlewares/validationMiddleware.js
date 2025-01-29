const { body, validationResult } = require('express-validator');

const validateUserStory = [
  body('action')
    .notEmpty()
    .withMessage('L\'action ne peut pas être vide')
    .trim()
    .escape(),
  
  body('need')
    .notEmpty()
    .withMessage('Le besoin ne peut pas être vide')
    .trim()
    .escape(),
  
  body('status')
    .optional()
    .isIn(['todo', 'doing', 'done'])
    .withMessage('Statut invalide'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priorité invalide'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserStory };
