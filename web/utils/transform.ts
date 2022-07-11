import type Prisma from "@prisma/client";
import type Stripe from "stripe";

export const transformProduct = ({
  name,
  description,
  price,
  image,
}: Prisma.Product): Stripe.Checkout.SessionCreateParams.LineItem => ({
  name,
  description,
  amount: price * 100,
  currency: "PLN",
  images: [image],
  quantity: 1,
});
