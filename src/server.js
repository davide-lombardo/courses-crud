const app = require('./app');
const { dbConnection, db } = require('./config/dbConfig');
const dotenv = require('dotenv');

dotenv.config();

port = process.env.DB_PORT || 3000;

dbConnection();

db.once('connected', () => {
  app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
  });
});
