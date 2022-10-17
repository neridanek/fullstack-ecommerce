import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryCache, QueryClient } from "react-query";
import { useQuery } from "react-query";
import { getProducts } from "../api/products";
import Checkout from "../components/Checkout";
import Layout from "../components/Layout";
import Products from "../components/Products";
import Login from "./login";
import Register from "./register";

const App: NextPage = () => {
  return (
    <Layout>
      <Products />
      <Checkout />
    </Layout>
  );
};
export default App;

const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", getProducts);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
