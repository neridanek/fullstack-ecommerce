import { Prisma, PrismaClient } from "@prisma/client";
import { execPath } from "process";
import supertest from "supertest";
import app from "../app";

describe("products", () => {
  describe("GET /products ", () => {
    // describe("given products does not exist", () => {
    //   it("should return 404", async () => {
    //     await supertest(app).get(`/products`).expect(404);
    //   });
    // });

    describe("given products does exist", () => {
      it("should return 200 status and products", async () => {
        const { body, statusCode } = await supertest(app).get(`/products`);
        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              image: expect.any(String),
              description: expect.any(String),
              price: expect.any(Number),
              name: expect.any(String),
            }),
          ])
        );
        expect(statusCode).toBe(200);
      });
    });
  });
});
