import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../api/users";
import Image from "next/image";
import logoImage from "../public/images/login.png";
import backgroundWave from "../public/images/wave.png";
import { useToken } from "../context/tokenContext";
import { UserData } from "../api/users/types";
import axios from "axios";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: handleLogin } = useMutation((data: UserData) => login(data), {
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      router.push("/home");
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const isButtonDisabled = !email || !password;
  return (
    <div>
      <div className="absolute bottom-0 left-0 h-screen -z-1 overflow-hidden">
        <Image
          quality={100}
          width={640}
          height={800}
          placeholder="blur"
          fill
          style={{ objectFit: "cover" }}
          src={backgroundWave}
        />
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="flex flex-col justify-center items-center z-20 h-screen p-20">
          <h1 className="text-blue-500 font-bold text-2xl mb-8 ">LOGIN</h1>
          <div className="">
            <form
              className="flex flex-col justify-center"
              onSubmit={handleSubmit(() =>
                handleLogin({
                  email: email,
                  password: email,
                })
              )}
            >
              <input
                type="text"
                name="login"
                className="rounded-md p-3 mb-3 bg-gray-100 text-blue-600  border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required={true}
              />
              <input
                type="password"
                name="password"
                className="rounded-md p-3 mb-5 bg-gray-100 text-blue-600 border-none "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required={true}
              />
              <button
                name="button"
                disabled={isButtonDisabled}
                className="rounded-md p-3 mb-5 text-white bg-blue-600 "
              >
                SUBMIT
              </button>
            </form>
            <p className="underline" onClick={() => router.push("/register")}>
              If you dont have account click there
            </p>
          </div>
        </div>
        <div className="">
          <Image width={550} height={400} src={logoImage} />
        </div>
      </div>
    </div>
  );
};

export default Login;
