import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { redirectToCheckout } from "../../utils/stripeRedirect";
import { transformProduct } from "../../utils/transform";
import Prisma from "@prisma/client";

export const getProducts = async () => {
  const { data } = await axios
    .request({
      method: "GET",
      url: "http://localhost:3000/products",
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const useGetProducts = () => useQuery("products", () => getProducts());

export const checkoutCart = async (products) => {
  const stripeItems = products.map((product) => transformProduct(product));
  const { data } = await axios.post(
    "http://localhost:3000/checkout",
    stripeItems
  );
  return data;
};

export const useCheckout = () => {
  return useMutation((products) => checkoutCart(products), {
    onSuccess: (data) => redirectToCheckout(data.id),
  });
};

const buyProduct = async (product) => {
  const stripeItem = transformProduct(product);
  console.log(stripeItem);
  const { data } = await axios.post("http://localhost:3000/checkout", [
    stripeItem,
  ]);
  return data;
};

export const useBuyProduct = () => {
  return useMutation((product) => buyProduct(product), {
    onSuccess: (data) => redirectToCheckout(data.id),
  });
};
