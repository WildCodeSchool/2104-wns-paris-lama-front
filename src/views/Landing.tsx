/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import userContext from "../store/userContext";
import arrow from "../assets/svg/right-arrow.svg";

export const Landing = (): JSX.Element => {
  const { user } = useContext(userContext);
  if (user) return <Redirect to="/dashboard" />;

  return (
    <div className="w-10/12 mx-auto">
      <div className="w-6/12 mx-auto mt-5 grid grid-rows-3 gap-4">
        <div className="row-span-2 col-span-2">
          <h1 className=" text-4xl ">
            Way to communicate Resources to{" "}
            <span style={{ color: "#059669" }}> Students</span>
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
            className="text-gray-200  font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn"
          >
            SignUp
            <img src={arrow} alt="arrow" width="12" className="ml-3 inline" />
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
};
