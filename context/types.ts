import type Prisma from "@prisma/client";
import { Product, Products } from "../api/products/types";

export type CartAction =
  | { type: "addProduct"; payload: Product }
  | { type: "deleteProduct"; payload: Product }
  | { type: "openMenu" }
  | { type: "closeMenu" };

export type CartState = {
  readonly products: Products;
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
