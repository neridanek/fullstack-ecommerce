import React from "react";
import type Prisma from "@prisma/client";
import { useCart } from "../context/cartContext";
import { useBuyProduct } from "../api/products";

const Product = (props) => {
  const { id, image, name, price, description } = props;
  const { dispatch } = useCart();

  const { mutate } = useBuyProduct();
  const buyProduct = () => mutate(props);

  const addToCart = () => {
    dispatch({ type: "addProduct", payload: props });
    dispatch({ type: "openMenu" });
  };

  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
        <img
          src={image}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          alt=""
        />
      </div>
      <div className="mt-4 mx-3 flex justify-between">
        <h2 className="text-sm font-medium">{name}</h2>

        <p className="text-sm font-medium text-gray-900">{price} PLN</p>
      </div>
      <button
        onClick={buyProduct}
        className="mt-6 group outline-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        Buy
      </button>
      <button
        onClick={addToCart}
        className="mt-4 group outline-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
