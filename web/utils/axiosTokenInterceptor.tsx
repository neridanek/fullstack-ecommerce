import axios from "axios";
import React, { useEffect } from "react";
import { handleRefreshToken } from "../api/token";
import { useToken } from "../context/tokenContext";
import jwt from "jsonwebtoken";

export const axiosJWT = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const AxiosTokenInterceptor = () => {
  // const {
  //   state: { accessToken, refreshToken },
  //   dispatch,
  // } = useToken();

  useEffect(() => {
    const requestIntercept = axiosJWT.interceptors.request.use(
      async (config) => {
        console.log("heejj");
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
        console.log(accessToken, "eldo");
        console.log(refreshToken, "elko");
        let currentDate = new Date();
        const decodedToken = jwt.decode(accessToken);
        console.log(
          "hejhejhej",
          decodedToken.exp * 1000,
          currentDate.getTime()
        );
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await handleRefreshToken(refreshToken).then((res) => {
            console.log(res.accessToken, "ostatni etaap");
            const token = res.accessToken;
            config.headers["authorization"] = token;
            localStorage.removeItem("acessToken");
            localStorage.setItem("accessToken", token);
          });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => axiosJWT.interceptors.request.eject(requestIntercept);
  });

  return axiosJWT;
};

export default AxiosTokenInterceptor;
