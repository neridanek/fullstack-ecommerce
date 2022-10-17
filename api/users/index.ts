import axios from "axios";
import { useQuery } from "react-query";
import { axiosJWT } from "../../utils/axiosTokenInterceptor";
import { UserData } from "./types";

export const register = async (data: UserData) => {
  await axios
    .post("http://localhost:3000/register", {
      data,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const login = async (data: UserData) => {
  const res = await axios
    .request({
      method: "POST",
      url: "http://localhost:3000/login",
      data,
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const logout = async (token: string) => {
  await axios.request({
    method: "POST",
    url: "http://localhost:3000/logout",
    data: token,
  });
};

export const getAccountInfo = async (token: string) => {
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

export const useGetAccountInfo = (token: string) => {
  return useQuery("accountInfo", () => getAccountInfo(token), {
    enabled: !!token,
  });
};
