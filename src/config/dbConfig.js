const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const env = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  CLUSTER: process.env.DB_CLUSTER,
  DB_NAME: process.env.DB_NAME,
  OPTIONS: process.env.DB_OPTIONS,
};

const dbURI = `mongodb+srv://${env.USER}:${env.PASSWORD}@${env.CLUSTER}/${env.DB_NAME}?${env.OPTIONS}`;

let mockDb = null;
//connection to database via URI
const dbConnection = async () => {
  try {
    //check if node is in test env, if it is, the server connects to a mockdb
    if (process.env.NODE_ENV == 'test') {
      mockDb = await MongoMemoryServer.create();
      const uri = mockDb.getUri();
      await mongoose.connect(uri);
    } else {
      await mongoose.connect(dbURI);
    }
  } catch (error) {
    console.error('Error during db connection :', error);
  }
};
let db = mongoose.connection;

//function to disconnect from db
const dbDisconnection = async () => {
  try {
    await mongoose.connection.close();
    if (mockDb) {
      await mockDb.stop();
    }
  } catch (error) {
    console.error('Error during db disconnection', error);
  }
};

db.once('connected', () => {
  console.log(`Connection to db completed`);
});

db.on('error', (err) => {
  console.error('Failed to connected to db - Server is not listening : ', err);
});

module.exports = { dbDisconnection, dbConnection, db };