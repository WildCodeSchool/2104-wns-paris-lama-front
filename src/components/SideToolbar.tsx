/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/svg/right-arrow.svg";

export const SideToolBar = ({
  element,
}: {
  element: Array<{
    content: string;
    icon: string;
    linkTo: string;
  }>;
}): JSX.Element => {
  return (
    <>
      <div className=" w-1/6 absolute left-0   h-screen bg-gray-100 ">
        <div className="relative pt-1 ">fdfd</div>
      </div>
    </>
  );
};
