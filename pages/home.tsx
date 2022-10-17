import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const accessToken = JSON.stringify(localStorage.getItem("accessToken"));
    setAccessToken(accessToken);
  }, [!accessToken]);
  const { data: accountInfo } = useGetAccountInfo(accessToken);

  return (
    <Layout>
      <Products />
      <Checkout />
    </Layout>
  );
};

export default Home;
