import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../api/users";
import Image from "next/image";
import { useToken } from "../context/tokenContext";
const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useToken();
  // const { mutate: loginUser } = useMutation((data) => login(data), {
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => console.log(error),
  // });

  // && router.push("/home"),

  const handleLogin = async () => {
    await login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }).then((res) => {
      const { accessToken, refreshToken } = res;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      // dispatch({ type: "addAccessToken", payload: accessToken });
      // dispatch({ type: "addRefreshToken", payload: refreshToken });

      router.push("/home");
      //walidacja do zmiany
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-purple-500 font-bold mb-8 ">LOGIN</h1>
      <Image width={30} height={30} src="/web/public/background.jpg" />
      <div>
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <input
            className="rounded-md p-3 mb-3 bg-gray-100 text-purple-500  "
            ref={emailRef}
            placeholder="email"
            required={true}
          />
          <input
            className="rounded-md p-3 mb-5 bg-gray-100 text-purple-500 "
            ref={passwordRef}
            placeholder="password"
            required={true}
          />
          {/* {errors.email && <div>email is required</div>}
        {errors.password && <div>password is required</div>} */}
          <input
            className="rounded-md p-3 mb-5 text-white bg-purple-600"
            type="submit"
          />
        </form>
        <p className="underline" onClick={() => router.push("/register")}>
          If you dont have account click there
        </p>
      </div>
    </div>
  );
};

export default Login;
