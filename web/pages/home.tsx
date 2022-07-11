import axios from "axios";
import React, { useEffect } from "react";
import { getProducts, useGetProducts } from "../api/products";
import { handleRefreshToken } from "../api/token";
import { useGetAccountInfo } from "../api/users";
import Checkout from "../components/Checkout";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Products from "../components/Products";
import { useToken } from "../context/tokenContext";
import AxiosTokenInterceptor from "../utils/axiosTokenInterceptor";

const Home = () => {
  // const {
  //   state: { accessToken, refreshToken },
  //   dispatch,
  // } = useToken();
  const axiosJWT = AxiosTokenInterceptor();

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    console.log(accessToken, "hej");
    const handleData = async () =>
      await axiosJWT.request({
        method: "GET",
        url: "http://localhost:3000/getAccountInfo",
        withCredentials: true,
        headers: {
          authorization: accessToken,
        },
      });
    handleData();
  });

  return (
    <Layout>
      <Products />
      <Checkout />
    </Layout>
  );
};

export default Home;
