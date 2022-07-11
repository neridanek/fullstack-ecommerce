import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

let refreshTokens: Array<String> = [];

const generateAccessToken = (user: Prisma.User) => {
  return jwt.sign(
    user,
    "5c2d6002caa2da36b4bc298743ba01dccbb0e0cca948bc80fe0f247bf2d29d39a6bdffc5c1ebfbac5ccbe86099463d38137de493fcb9936b1dc1c8acd4d92760",
    { expiresIn: "15s" }
  );
};

export const login = async (req: Request, res: Response) => {
  const user: Prisma.User = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.sendStatus(400).send("Email doesnt exist");
  const hashPassword = await bcrypt.hash(user?.password, 10);
  const validPass = await bcrypt.compare(req.body.email, hashPassword);

  if (!validPass) return res.status(400).send("Invalid password");
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(
    user,
    "280c565639d0ee01b3247bb20751acfe5c64bbd81c28a82aabfde4467b2bd80c1e121190be26080d045e3b822fab4f9dcf1421e4c379444cde152351f42ef7a8"
  );
  refreshTokens.push(refreshToken);
  console.log(accessToken, "stary access");
  // res.cookie("JWT", accessToken, {
  //   httpOnly: true,
  // });
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

export const getRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (refreshToken == null) return res.status(401).send("Not authorized");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("token is valid");
  jwt.verify(
    refreshToken,
    "280c565639d0ee01b3247bb20751acfe5c64bbd81c28a82aabfde4467b2bd80c1e121190be26080d045e3b822fab4f9dcf1421e4c379444cde152351f42ef7a8",
    (err, user: Prisma.User) => {
      if (err) return console.log(err);
      const accessToken = generateAccessToken(user);
      console.log(accessToken, "nowy access");
      res.json({ accessToken: accessToken });
    }
    //tworzy ten sam accessToken co byl poprzednio dlaczego??
  );
};

export const logout = async (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.status(204).send("Logout successful");
};

export const register = async (req: Request, res: Response) => {
  const isSuccess = true;
  const existUser = await prisma.user.findMany({
    where: {
      email: req.body.email,
    },
  });
  const hashPassword = await bcrypt.hash(req.body.data.password, 10);
  if (existUser) return res.status(400).send("Email is existing");
  const newUser = await prisma.user.create({
    data: {
      email: req.body.data.email,
      password: hashPassword,
    },
  });

  if (newUser) {
    return res.status(200).json({ isSuccess });
  } else {
    return res.status(400).send("Account not created");
  }
};

export const getAccountInfo = async (req: Request, res: Response) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });
  if (currentUser) return res.status(200).json(currentUser);
  if (!currentUser)
    return res.sendStatus(400).send("no avaiable account to get info");
};
