import React from "react";
import Prisma from "@prisma/client";
import CartItem from "./CartItem";

const CartItems = ({ products }) => {
  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {products.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default CartItems;
