/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { v4 } from "uuid";
import TextAreaMarkdown from "./TextAreaMarkdown";

export const Markdown = ({
  handleOnChange,
  value,
}: {
  handleOnChange;
  value;
}): JSX.Element => {
  return (
    <>
      <div className="w-full">
        <TextAreaMarkdown
          id={v4()}
          value={value}
          onChange={(data) => {
            handleOnChange(data);
          }}
        />
      </div>
    </>
  );
};
