const express = require('express');
const userStoriesRoutes = require('./routes/userStoriesRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
// const logger = require('./middlewares/logger');
const sequelize = require('./config/database');

const app = express();

// app.use(logger);

// Middleware pour parser les JSON
app.use(express.json());

// Routes Auth
app.use('/api/auth', authRoutes);

// Ajouter les routes User Stories
app.use('/api/userstories', userStoriesRoutes);

app.use(errorHandler);

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
sequelize.sync({force: false, alter: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});

