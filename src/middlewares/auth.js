const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtSecret = process.env.REACT_APP_JWT_SECRET

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Veuillez vous authentifier' });
  }
};

module.exports = authMiddleware;
