const errorHandler = (err, req, res, next) => {
    console.error("Backend error:", err); // Log the entire error object
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur', error: err.message, stack: err.stack });
    next(err);
  };
  
  module.exports = errorHandler;
