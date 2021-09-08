/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../graphql/generated/graphql";
import userContext from "../store/userContext";
import { decode } from "../utils/decodeJWT";

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
};

export const Login = (): JSX.Element => {
  const { user, updateUser } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const [loginUser] = useLoginMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log(errors, data);
    try {
      const respondeLogin = await loginUser({
        variables: {
          data: {
            email: data.email,
            password: data.password,
          },
        },
      });
      const { user: resUser } = decode(
        respondeLogin.data?.Login.accessToken as string
      );

      const { name, email } = resUser;
      updateUser({
        accessToken: respondeLogin.data?.Login.accessToken as string,
        email,
        name,
      });
      console.log(resUser);
      token(JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  });

  const token = (userObj: string) => {
    localStorage.setItem("user", userObj);
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex flex-col justify-center items-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Input
          label="E-mail"
          inputName="email"
          placeHolder="Jane@mail.com"
          type="email"
          error={errors.email}
          register={register("email", {
            required: "email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "invalid email address",
            },
          })}
        />
        <Input
          label="Password"
          inputName="password"
          placeHolder="********"
          type="password"
          error={errors.password}
          register={register("password", {
            required: "password is required",
            minLength: 8,
            maxLength: 32,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              message: "invalid password",
            },
          })}
        />
        <button
          type="submit"
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
        >
          submit
        </button>
      </form>
    </div>
  );
};
