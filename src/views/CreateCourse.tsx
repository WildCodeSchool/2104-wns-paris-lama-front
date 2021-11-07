/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import TextAreaMarkdown from "../components/TextAreaMarkdown";
// import { Steps } from "../components/stepper";
// import TextAreaMarkdown from "../components/TextAreaMarkdown";
import { useCreateCourseMutation } from "../graphql/generated/graphql";

type ClassParams = {
  id: string;
  stepId: string;
};
export type ICourse = {
  contentMd: string;
  step: number;
  title: string;
  next: number | null;
  prev: number | null;
  contentHtml: string;
};
export const CreateCourse = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ClassParams>();

  const initialValue = (stepId) =>
    localStorage.getItem(`content-${stepId}`) ||
    JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: `A line of text in a paragraph.${stepId}` }],
      },
    ]);
  const initialSteps =
    localStorage.getItem(`steps`) ||
    JSON.stringify([
      {
        contentMd: initialValue(1),
        step: 1,
        title: "",
        next: null,
        prev: null,
        contentHtml: "",
      },
    ]);
  const [steps, setSteps] = useState<Array<ICourse>>(JSON.parse(initialSteps));
  const [title, setTitle] = useState("");

  const onAddStep = () => {
    const stepsCopy = [...steps];
    stepsCopy.forEach((step) => {
      step.next = step.step + 1;
    });
    setSteps([
      ...steps,
      {
        contentMd: initialValue(steps.length + 1),
        step: steps.length + 1,
        title: "",
        next: null,
        prev: steps.length,
        contentHtml: "",
      },
    ]);
  };

  const onChangeStepsTitle = (i) => (e: React.FormEvent<HTMLInputElement>) => {
    const stepsCopy = [...steps];
    stepsCopy[i].title = e.currentTarget.value;
    setSteps(stepsCopy);
  };
  const onChangeStepsContent = (i) => (data: Array<any>) => {
    console.log(data, i);
    const stepsCopy = [...steps];
    const content = JSON.stringify(data);
    stepsCopy[i].contentMd = content;
    setSteps(stepsCopy);
    console.log(stepsCopy);
  };

  const { handleSubmit } = useForm({ mode: "onTouched" });

  const [createCourse] = useCreateCourseMutation({
    refetchQueries: ["getOneClassRoom"],
  });

  const onSubmit = handleSubmit(async () => {
    console.log(steps);
    try {
      await createCourse({
        variables: {
          data: {
            steps,
            classRoom: id,
            title,
          },
        },
      });
      localStorage.removeItem(`steps`);
      history.push(`/class-room/${id}`);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <div className="w-9/12 mx-auto">
        <form onSubmit={onSubmit} className=" flex flex-col  pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center ">
            <div className="w-1/4 ">
              <input
                className="appearance-none block w-full bg-gray-300 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-200 "
                id="form-title"
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <hr />
            </div>
            <button
              onClick={onAddStep}
              type="button"
              className="text-gray-200 float-right   font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn mb-5"
            >
              add another step
            </button>
          </div>
          {steps.map((step, i) => (
            <div key={step.step} className="w-full">
              <h1>{`step - ${step.step} `}</h1>
              <div className="w-1/4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`form-${step.step}`}
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-300 text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-200 "
                  id={`form-${step.step}`}
                  type="text"
                  placeholder="Course Title"
                  value={step.title}
                  onChange={onChangeStepsTitle(i)}
                />
              </div>
              <Markdown
                handleOnChange={(data) => {
                  onChangeStepsContent(i);
                  const stepsCopy = [...steps];
                  const content = JSON.stringify(data);
                  stepsCopy[i].contentMd = content;
                  localStorage.setItem(`steps`, JSON.stringify(stepsCopy));
                }}
                value={JSON.parse(step.contentMd)}
              />
            </div>
          ))}
          <button
            type="submit"
            className="text-gray-200  font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn mb-5"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};
