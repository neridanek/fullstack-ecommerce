import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { redirectToCheckout } from "../../utils/stripeRedirect";
import { transformProduct } from "../../utils/transform";
import Prisma from "@prisma/client";
import { GetProductsResponse, Product, Products } from "./types";

export const getProducts = async () => {
  const { data } = await axios
    .request<GetProductsResponse>({
      method: "GET",
      url: "http://localhost:3000/products",
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const useGetProducts = () =>
  useQuery<GetProductsResponse>("products", () => getProducts());

export const checkoutCart = async (products: Products) => {
  const stripeItems = products.map((product) => transformProduct(product));
  const { data } = await axios.post(
    "http://localhost:3000/checkout",
    stripeItems
  );
  return data;
};

export const useCheckout = () => {
  return useMutation((products: Products) => checkoutCart(products), {
    onSuccess: (data) => redirectToCheckout(data.id),
  });
};

const buyProduct = async (product: Product) => {
  const stripeItem = transformProduct(product);
  const { data } = await axios.post("http://localhost:3000/checkout", [
    stripeItem,
  ]);
  return data;
};

export const useBuyProduct = () => {
  return useMutation((product: Product) => buyProduct(product), {
    onSuccess: (data) => redirectToCheckout(data.id),
  });
};
