import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { HandleRefreshTokensResponse } from "./types";

export const handleRefreshToken = async (token: String) => {
  const { data } = await axios
    .request<HandleRefreshTokensResponse>({
      method: "POST",
      url: "http://localhost:3000/token",
      data: {
        token,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return data;
};

// export const useRefreshToken = () => useQuery("token", () => refreshToken);
