/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { FieldError } from "react-hook-form";
import { v4 } from "uuid";

export const Input = ({
  label,
  placeHolder,
  type,
  error,
  register,
  inputName,
}: {
  label: string;
  placeHolder: string;
  type: string;
  error: FieldError | undefined;
  register: any;
  inputName: string | undefined;
}): JSX.Element => {
  const uid = v4();
  return (
    <>
      <div className="w-full ">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor={`form-${label}--${uid}`}
        >
          {label}
        </label>
        <input
          className="appearance-none block w-full bg-gray-700 text-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-900 "
          id={`form-${label}--${uid}`}
          type={type}
          {...register}
          placeholder={placeHolder}
          name={inputName}
        />
        {error ? (
          <p className="text-red-500 text-xs italic"> {error.message} </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
