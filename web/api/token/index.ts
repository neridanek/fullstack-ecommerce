import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const handleRefreshToken = async (token: String) => {
  const data = await axios({
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
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return data;
};

// export const useRefreshToken = () => useQuery("token", () => refreshToken);
