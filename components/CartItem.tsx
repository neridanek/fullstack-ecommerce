import React from "react";
import type Prisma from "@prisma/client";
import { useCart } from "../context/cartContext";
import { Product } from "../api/products/types";

const CartItem = (product: Product) => {
  const { id, name, price, image } = product;
  const { dispatch } = useCart();
  const handleDelete = (product: Product) => {
    dispatch({ type: "deleteProduct", payload: product });
  };
  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3></h3>
          <p className="ml-4"></p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex">
            <button
              onClick={() => handleDelete(product)}
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
