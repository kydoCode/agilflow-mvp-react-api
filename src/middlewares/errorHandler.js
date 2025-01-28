const errorHandler = (err, req, res, next) => {
    console.error("Backend error:", JSON.stringify(err, null, 2));
    let errorMessage = 'Une erreur est survenue sur le serveur';
    let errorDetails = {};

    if (process.env.NODE_ENV !== 'production') {
        errorMessage = err.message;
        errorDetails = { stack: err.stack, fullError: err };
    }

    res.status(500).json({ message: errorMessage, error: err.message, ...errorDetails });
    next(err);
};

module.exports = errorHandler;
