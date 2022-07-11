import type Prisma from "@prisma/client";
import type { CartAction, CartState } from "../types";

const calculateTotalPrice = (products) => {
  return products.reduce((acc, curr) => acc + curr.price, 0);
};

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "addProduct": {
      const products = [...state.products];
      const newProduct = action.payload;
      const isTheNewProductInCart = products.find(
        (product) => product.id === newProduct.id
      );
      const newProducts = [newProduct, ...products];

      const totalPrice = calculateTotalPrice(newProducts);

      if (!isTheNewProductInCart) {
        return {
          ...state,
          products: newProducts,
          totalPrice,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case "deleteProduct": {
      const products = [...state.products];
      const productToDelete = action.payload;

      const newProducts = products.filter(
        (product) => product.id !== productToDelete.id
      );

      const totalPrice = calculateTotalPrice(newProducts);

      return {
        ...state,
        products: [...newProducts],
        totalPrice,
      };
    }
    case "openMenu": {
      return {
        ...state,
        isOpen: true,
      };
    }
    case "closeMenu": {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
