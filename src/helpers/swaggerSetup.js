const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Node Project",
      version: "1.0.0",
      description: "CRUD docs",
    },
    servers: [
      {
        ulr: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;