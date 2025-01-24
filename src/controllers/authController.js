const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
// const JWT_SECRET = 'votre_secret_jwt'; // À stocker dans les variables d'environnement en production


// exports.register = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const user = await User.create({ name, email, password, role });
//     res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user.id });
//   } catch (error) {
//     next(error);
//   }
// };

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  console.log('getProfile function called');
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};