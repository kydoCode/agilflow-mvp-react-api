const dotenv = require('dotenv');
const result = dotenv.config({ path: '[PATH_REDACTED]/gitProjects/06_DWWM/Projects/11/agilflow-mpv-react/agilflow-mvp-react/back/my-express-api/api/.env' });

if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
console.error("DB_HOST:", process.env.DB_HOST);
console.error("DB_USER:", process.env.DB_USER);
console.error("DB_PASS:", process.env.DB_PASS);
console.error("DB_NAME:", process.env.DB_NAME);
