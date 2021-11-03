/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

export const TagInput = ({
  input,
  onKeyDown,
  onChange,
  tags,
  onKeyUp,
  deleteTag,
}: {
  input;
  onKeyDown;
  onChange;
  tags;
  onKeyUp;
  deleteTag;
}): JSX.Element => {
  return (
    <>
      <div className="w-full ">
        <label
          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
          htmlFor="form-tag"
        >
          Tags
        </label>
        <div className=" overflow-hidden ">
          <div className="px-6 pt-4 pb-2 flex flex-wrap ">
            {tags.map((tag, index) => (
              <span
                key={index}
                className=" flex flex-row   gap-2 justify-betweeninline-block bg-gray-900 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
              >
                #{tag}
                <button onClick={() => deleteTag(index)}>x</button>
              </span>
            ))}
          </div>
          <input
            className="appearance-none block w-full bg-gray-700 text-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-900 "
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
    </>
  );
};
