require("dotenv").config();
// import express from "express";
const express = require('express');
const app = express();
const cors = require('cors');
const initRoutes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// import cors from "cors";
// import initRoutes from "./routes";
require("./config/connection_database");
// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://capstone-matching.herokuapp.com",
      },
    ],
  },
  apis: ["./routes/*js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

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
