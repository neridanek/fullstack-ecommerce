import express from "express";
import { getProducts, checkout } from "../controllers/products";

const router = express.Router();

router.get("/products", getProducts);
router.post("/checkout", checkout);
export default router;
