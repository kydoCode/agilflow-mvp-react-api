const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const userStoriesRoutes = require('./routes/userStoriesRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
// const logger = require('./middlewares/logger');
const sequelize = require('./config/database');
const Redis = require('ioredis');
const { RedisStore } = require('rate-limit-redis');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// Middleware de logging - placé en premier
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


app.use(helmet());
app.use(bodyParser.json({ limit: '10kb' }));

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

// Appliquer à toutes les requêtes
app.use(limiter);

// CORS

const whitelist = ['http://localhost:5173', 'http://localhost:3000', 'https://www.agilflow.app'];


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

// app.use('/api/public', cors());
// app.use(cors());
app.use(cors(corsOptions));


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
