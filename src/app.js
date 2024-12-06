const express = require('express');
const cors = require('cors');
const userStoriesRoutes = require('./routes/userStoriesRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
// const logger = require('./middlewares/logger');
const sequelize = require('./config/database');

const app = express();

// CORS

const whitelist = ['<http://localhost:3000>', '<https://votreapplication.com>'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use('api/public', cors());
// app.use(cors());

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

