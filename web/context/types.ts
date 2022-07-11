import type Prisma from "@prisma/client";

export type CartAction =
  | { type: "addProduct"; payload: Prisma.Product }
  | { type: "deleteProduct"; payload: Prisma.Product }
  | { type: "openMenu" }
  | { type: "closeMenu" };

export type CartState = {
  readonly products: Array<Prisma.Product>;
  readonly totalPrice: number;
  readonly isOpen: boolean;
};

export type TokenAction =
  | { type: "addAccessToken"; payload: String }
  | { type: "addRefreshToken"; payload: String };

export type TokenState = {
  readonly accessToken: String;
  readonly refreshToken: String;
};
