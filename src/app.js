const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize')

const courseTypesRouter = require('./routes/courseTypeRoutes');
const universitiesRouter = require('./routes/universityRoutes');
const coursesRouter = require('./routes/courseRoutes');

const swaggerDoc = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require('path');
const swaggerDocumentation = yaml.load(path.join(__dirname, './helpers/documentation.yaml'));

// express app
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request logger
app.use(morgan('dev'));

// security http headers
app.use(helmet());

//sanitize queries
app.use(mongoSanitize());

//routes
app.use('/api/courseTypes', courseTypesRouter);
app.use('/api/universities', universitiesRouter);
app.use('/api/courses', coursesRouter);

app.use(
  "/documentations",
  swaggerDoc.serve,
  swaggerDoc.setup(swaggerDocumentation)
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to courses-crud ' });
});

module.exports = app;
