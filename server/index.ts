require("dotenv").config();

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/isAuth";
import cors from "cors";
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/products";
import tokenRoutes from "./routes/tokens";

const app: Express = express();

dotenv.config();

const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`http://localhost:${3001}`, `https://localhost:${3001}`],
    credentials: true,
  })
);
app.use(tokenRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.listen(port, () => console.log("Server is running"));
