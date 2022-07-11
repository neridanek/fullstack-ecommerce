import express from "express";
import { getRefreshToken } from "../controllers/users";

const router = express.Router();

router.post("/token", getRefreshToken);

export default router;
