const express = require('express');
const cors = require('cors');
const userStoriesRoutes = require('./routes/userStoriesRoutes');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour gérer les CORS si ton front est sur un autre domaine
app.use(cors());

// Routes
app.use('/api/userstories', userStoriesRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
