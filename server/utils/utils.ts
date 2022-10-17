import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const accessGenerationToken =
  "5c2d6002caa2da36b4bc298743ba01dccbb0e0cca948bc80fe0f247bf2d29d39a6bdffc5c1ebfbac5ccbe86099463d38137de493fcb9936b1dc1c8acd4d92760";
export const refreshGenerationToken =
  "280c565639d0ee01b3247bb20751acfe5c64bbd81c28a82aabfde4467b2bd80c1e121190be26080d045e3b822fab4f9dcf1421e4c379444cde152351f42ef7a8";

export const generateAccessToken = (user: Prisma.User) => {
  return jwt.sign(user, accessGenerationToken, { expiresIn: "15s" });
};

export const prisma = new PrismaClient();
