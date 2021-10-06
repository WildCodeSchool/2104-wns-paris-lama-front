/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../store/userContext";
import arrow from "../assets/svg/right-arrow.svg";

export const Landing = (): JSX.Element => {
  const { user, updateUser } = useContext(userContext);

  return (
    <div className="w-4/12 mx-auto mt-5 grid grid-rows-4 gap-4">
      <div className="row-span-2 col-span-2">
        <h1 className=" text-4xl ">
          HIIIIIIIIIIII
          Way to communicate Resources to{" "}
          <span style={{ color: "#e04f4f" }}> Students</span>
        </h1>
        <p className="mt-11">
          Join us to share resources and get feedback with comment and review
          system
        </p>
      </div>
      <div className="row-span-1 col-span-2 mt-5 ml-auto mr-0">
        <Link
          to="/register"
          key={Date.now() + Math.random() * 100}
          className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          SignUp
          <img src={arrow} alt="arrow" width="12" className="ml-3 inline" />
        </Link>
      </div>
      <div className="row-span-1 col-span-2">
        <hr />
      </div>
    </div>
  );
};
