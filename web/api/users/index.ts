import axios from "axios";
import { useQuery } from "react-query";
import { axiosJWT } from "../../utils/axiosTokenInterceptor";

export const register = async (data) => {
  await axios
    .post("http://localhost:3000/register", {
      data,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// type AxiosResponse = {
//   accessToken: string;
// };
export const login = async (data) => {
  const res = await axios
    .request({
      method: "POST",
      url: "http://localhost:3000/login",
      data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const logout = async (token) => {
  await axios.request({
    method: "POST",
    url: "http://localhost:3000/logout",
    data: token,
  });
};

export const getAccountInfo = async (token) => {
  const { data } = await axiosJWT.request({
    method: "GET",
    url: "http://localhost:3000/getAccountInfo",
    withCredentials: true,
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const useGetAccountInfo = (token) => {
  return useQuery("accountInfo", () => getAccountInfo(token));
};
