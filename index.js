require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const initRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require("./config/connection_database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Capstone Matching API",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.SWAGGER_URL || "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },

  apis: ["./routes/*js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;

initRoutes(app);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

