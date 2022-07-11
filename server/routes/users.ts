import express from "express";

import { getAccountInfo, login, register, logout } from "../controllers/users";
import { authenticateToken } from "../middlewares/isAuth";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/getAccountInfo", authenticateToken, getAccountInfo); //middleware

export default router;
