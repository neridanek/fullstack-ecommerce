require("dotenv").config();

import express, { Express, Request, Response } from "express";
import { authenticateToken } from "./middlewares/isAuth";
import cors from "cors";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/products";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const app: Express = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Developer",
      },
      version: "1.0.0",
    },
    servers: [{ url: "https://localhost:3000" }],
  },
  apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(userRoutes);
app.use(productRoutes);

export default app;
