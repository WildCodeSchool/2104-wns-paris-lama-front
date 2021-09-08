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
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={`form-${label}--${uid}`}
        >
          {label}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none rounded   focus:bg-gray-100 is-invalid"
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
