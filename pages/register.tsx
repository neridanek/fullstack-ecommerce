import { Router, useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { register } from "../api/users";
import { UserData } from "../api/users/types";
import Image from "next/image";
import logoImage from "../public/images/login.png";
import backgroundWave from "../public/images/wave.png";

const Register = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: createUser, data } = useMutation(
    (data: UserData) => register(data).then((res) => console.log(res)),
    {
      onSuccess: () => router.push("/login"),
    }
  );

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = () => {
    createUser({
      email: email,
      password: email,
    });
  };
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
          style={{ objectFit: "fill" }}
          src={backgroundWave}
        />
      </div>
      <div className="flex flex-row items-center justify-end  ">
        <div className="flex flex-col justify-center items-center h-screen z-20  p-20">
          <h1 className="text-blue-500 font-bold text-2xl mb-8 ">REGISTER</h1>
          <div className="">
            <form
              className="flex flex-col justify-center"
              onSubmit={handleSubmit(handleRegister)}
            >
              <input
                type="text"
                className="rounded-md p-3 mb-3 bg-gray-100 text-blue-600  border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required={true}
              />
              <input
                type="password"
                className="rounded-md p-3 mb-5 bg-gray-100 text-blue-600 border-none "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required={true}
              />
              <button
                disabled={isButtonDisabled}
                className="rounded-md p-3 mb-5 text-white bg-blue-600 "
              >
                SUBMIT
              </button>
            </form>
            <p className="underline" onClick={() => router.push("/login")}>
              If you are already registered click there
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

export default Register;
