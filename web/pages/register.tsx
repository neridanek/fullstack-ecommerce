import { Router, useRouter } from "next/router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { register } from "../api/users";

const Register = () => {
  const router = useRouter();
  const { mutate: createUser, data } = useMutation(
    (data) => register(data).then((res) => console.log(res)),
    {
      onSuccess: () => router.push("/login"),
    }
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = () => {
    createUser({
      email: emailRef.current?.value,
      password: passwordRef.current.value,
    });
    // register(emailRef.current?.value, passwordRef.current.value);
    // if (data) router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-purple-500 font-bold mb-8 ">REGISTER</h1>

      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(handleRegister)}
      >
        <input
          className="rounded-md p-3 mb-3 bg-gray-100 text-purple-500  "
          ref={emailRef}
          placeholder="email"
          required={true}
        />
        <input
          className="rounded-md p-3 mb-5  bg-gray-100 text-purple-500 "
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
      <p className="underline" onClick={() => router.push("/login")}>
        If you are already registered click there
      </p>
    </div>
  );
};

export default Register;
