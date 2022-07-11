import { PrismaClient } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { Request, Response } from "express";
import { Stripe } from "stripe";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(200).json(err);
  }
};

export const checkout = async (req: Request, res: Response) => {
  console.log(req.body, "okk");
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
};
