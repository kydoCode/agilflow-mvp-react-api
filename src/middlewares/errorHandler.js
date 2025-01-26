const errorHandler = (err, req, res, next) => {
    console.error("Backend error:", err); // Log the entire error object
    console.error("Backend error:", err);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur', error: err.message, stack: err.stack, fullError: err });
    next(err);
  };

module.exports = errorHandler;
