const express = require('express');
const userStoriesRoutes = require('./routes/userStoriesRoutes');

const app = express();

// Middleware pour parser les JSON
app.use(express.json());

// Ajouter les routes User Stories
app.use('/api/userstories', userStoriesRoutes);

app.get('/', (req, res) => {
  res.send('Fonctionne, V1.0');
});


// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
