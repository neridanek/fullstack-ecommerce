import { Request, Response } from "express";
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middlewares/isAuth";
import { generateAccessToken, refreshGenerationToken } from "../utils/utils";

const prisma = new PrismaClient();
const router = express.Router();
let refreshTokens: Array<String> = [];

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      summary: Get access & refresh tokens by posting user data
 *      tags: [Users]
 *      requestBody:
 *        description: Products
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: String
 *                password:
 *                  type: String
 *      responses:
 *        200:
 *          description: A sucessful response,
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: String
 *                  refreshToken:
 *                    type: String
 *        400:
 *          description: email doesnt exist or invalid password,
 */
router.post("/login", async (req: Request, res: Response) => {
  res.set("Acess-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  const user: Prisma.User = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.sendStatus(400).send("Email doesnt exist");
  const hashPassword = await bcrypt.hash(user?.password, 10);
  const validPass = await bcrypt.compare(req.body.password, hashPassword);
  if (!validPass) return res.status(400).send("Invalid password");
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, refreshGenerationToken);
  refreshTokens.push(refreshToken);
  console.log(accessToken, "stary access");
  // res.cookie("JWT", accessToken, {
  //   httpOnly: true,
  // });
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

/**
 * @swagger
 * paths:
 *  /logout:
 *    post:
 *      summary: use when you logout from account in order to clear refresh tokens by posting token
 *      tags: [Users]
 *      requestBody:
 *        description: token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refreshToken:
 *                  type: Boolean
 *      responses:
 *        204:
 *          description: A sucessful response,
 */
router.post("/logout", async (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.status(204).send("Logout successful");
});

/**
 * @swagger
 * paths:
 *  /register:
 *    post:
 *      summary: use to login by posting email and password
 *      tags: [Users]
 *      requestBody:
 *        description: Products
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: String
 *                password:
 *                  type: String
 *      responses:
 *        200:
 *          description: A sucessful response,
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  isSuccess:
 *                    type: Boolean
 *
 *        400:
 *          description: email doesnt exist or invalid password,
 */
router.post("/register", async (req: Request, res: Response) => {
  const isSuccess = true;
  const existUser = await prisma.user.findMany({
    where: {
      email: req.body.data.email,
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
});

/**
 * @swagger
 * paths:
 *  /token:
 *    post:
 *      summary: Get access token by posting refresh token
 *      tags: [Users]
 *      requestBody:
 *        description: new access token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: String
 *
 *      responses:
 *        200:
 *        description: A sucessful response,
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: String
 *        403:
 *          description: Invalid refresh token,
 */
router.post("/token", async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  console.log(refreshToken, "heeeeeeeeeej");
  if (refreshToken == null) return res.status(401).send("Not authorized");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("token is invalid");
  jwt.verify(
    refreshToken,
    refreshGenerationToken,
    (err, user: Prisma.User) => {
      if (err) return console.log(err);
      const accessToken = generateAccessToken(user);
      console.log(accessToken, "nowy access");
      res.json({ accessToken: accessToken });
    }
    //tworzy ten sam accessToken co byl poprzednio dlaczego??
  );
});

/**
 * @swagger
 * paths:
 *  /getAccountInfo:
 *    get:
 *      summary: Get user account data by posting user id
 *      tags: [Users]
 *      requestBody:
 *        description: Products
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: String
 *      responses:
 *        200:
 *          description: A sucessful response,
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  currentUser:
 *                    type: Array
 *        400:
 *          description: No available account,
 */
router.get(
  "/getAccountInfo",
  authenticateToken,
  async (req: Request, res: Response) => {
    const currentUser = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });
    if (currentUser) return res.status(200).json(currentUser);
    if (!currentUser)
      return res.sendStatus(400).send("no avaiable account to get info");
  }
);
export default router;
