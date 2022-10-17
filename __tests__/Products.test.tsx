import axios from "axios";
import { getProducts } from "../api/products";
import products from "../__mocks__/products.json";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("axios get products", async () => {
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data: products }));
  const result = await getProducts();
  expect(result).equal(products);
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});
