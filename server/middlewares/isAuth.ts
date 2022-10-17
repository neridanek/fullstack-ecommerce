import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log(token, "token");

  if (!token) return res.status(401).send("No available token");
  const decodedToken = jwt.verify(
    token,
    "5c2d6002caa2da36b4bc298743ba01dccbb0e0cca948bc80fe0f247bf2d29d39a6bdffc5c1ebfbac5ccbe86099463d38137de493fcb9936b1dc1c8acd4d92760"
  );

  if (!decodedToken) return res.status(403).send("Invalid token");
  req.userId = decodedToken.user?.id;
  next();
};
