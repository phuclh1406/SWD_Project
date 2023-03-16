require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const initRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require("./config/connection_database");
const controllers = require('./controllers');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));

// app.use(cors());
// app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: "25mb" }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

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

app.post('/api/v1/stripe/webhook', express.raw({type: "*/*"}), controllers.stripeWebhook);

app.use(express.json());

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

