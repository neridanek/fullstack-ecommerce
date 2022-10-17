import express from "express";
import { PrismaClient } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { Request, Response } from "express";
import { Stripe } from "stripe";
import app from "../app";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * paths:
 *  /products:
 *    get:
 *      summary: get all products
 *      tags: [Products]
 *    responses:
 *      200:
 *       description: A sucessful response
 */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(200).json(err);
  }
});

/**
 * @swagger
 * paths:
 *  /checkout:
 *    post:
 *      summary: get checkout session ID by posting products to buy
 *      tags: [Products]
 *      requestBody:
 *        description: Products
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                products:
 *                  type: Array
 *    responses:
 *      200:
 *        description: A sucessful response,
 *      500:
 *        description: Server problem,
 */
router.post("/checkout", async (req: Request, res: Response) => {
  const stripe = new Stripe(
    "sk_test_51IpCBhIujyIA1co1kEOjISAGJJHikbZLIaMI5czZGkAuBWUpOoAwEroij6fMJRTvEvxr27D5yFXi457NVPwuLbD700qWUypUHy",
    {
      apiVersion: "2020-08-27",
    }
  );

  try {
    const { id } = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: req.body,
      success_url: `http://localhost:3001/home`,
      cancel_url: `http://localhost:3001/home`,
    });
    res.status(200).json({ id });
    res.end();
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
