const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtSecret = process.env.JWT_SECRET

const authMiddleware = async (req, res, next) => {
  console.log('Auth middleware called');
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    // Vérifier si le token a expiré
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: 'Token expiré' });
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Veuillez vous authentifier' });
  }
};

module.exports = authMiddleware;
