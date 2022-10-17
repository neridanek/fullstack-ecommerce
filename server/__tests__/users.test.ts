import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import app from "../app";
import { prisma } from "../utils/utils";

const userRegisterPayload = {
  data: { email: "asdaaa", password: "asdbbbb" },
};
const userLoginPayload = {
  email: "asd",
  password: "asd",
};

describe("users", () => {
  describe("POST /register", () => {
    describe("given the email not exist and pass are valid", () => {
      it("should return 200 and isSuccess param", async () => {
        const { body, statusCode } = await supertest(app)
          .post(`/register`)
          .send(userRegisterPayload);

        //check response
        expect(body).toEqual({ isSuccess: expect.any(Boolean) });

        //check that email doesnt exist in db
        const user = await prisma.user.findFirst({
          where: { email: userRegisterPayload.data.email },
        });
        expect(userRegisterPayload.data.email).not.toBe(user?.email);

        expect(statusCode).toBe(200);
      });
    });
    // describe("given the password is invalid or email exist", () => {
    //   it("should return a 400", async () => {
    //     const { body, statusCode } = await supertest(app)
    //       .post(`/register`)
    //       .send({
    //   data:userLoginPayload
    // })

    //     //check that email exist in db
    //     const user = await prisma.user.findFirst({
    //       where: { email: userRegisterPayload.data.email },
    //     });
    //     expect(userRegisterPayload.data.email).toBe(user?.email);

    //     expect(statusCode).toBe(400);
    //   });
    // });
  });

  describe("POST /login", () => {
    // describe("given the password and email are invalid", () => {
    //   it("should return a 400", async () => {
    //     const { body, statusCode } = await supertest(app)
    //       .post(`/login`)
    //       .send({
    // email: "asdbbbb",
    // password: "asdddd",
    // });

    //     //check that user doesnt exist in db
    //     const user = await prisma.user.findFirst({
    //       where: { email: userLoginPayload.email },
    //     });
    //     expect(userLoginPayload.email).not.toBe(user?.email);
    //     expect(userLoginPayload.password).not.toBe(user?.password);

    //     expect(statusCode).toBe(400);
    //   });
    // });
    describe("given the password and email are valid", () => {
      it("should return a 200", async () => {
        const { body, statusCode } = await supertest(app)
          .post(`/login`)
          .send(userLoginPayload);

        //check that user exist in db
        const user = await prisma.user.findFirst({
          where: { email: userLoginPayload.email },
        });
        expect(userLoginPayload.email).toBe(user?.email);
        expect(userLoginPayload.password).toBe(user?.password);

        //check response
        expect(body).toEqual(
          expect.objectContaining({
            refreshToken: expect.any(String),
            accessToken: expect.any(String),
          })
        );
        expect(statusCode).toBe(200);
      });
    });
  });
});
