/* eslint-disable react/button-has-type */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { Link, Redirect } from "react-router-dom";
import { SimpleMdeReact } from "react-simplemde-editor";
import MarkdownView from "react-showdown";
import showdownHighlight from "showdown-highlight";
import { useCreateCourseMutation } from "../graphql/generated/graphql";

type ClassParams = {
  id: string;
};
export const CreateCourse = (): JSX.Element => {
  const [steps, setSteps] = useState<
    Array<{
      contentMd: string;
      step: number;
      title: string;
      next: number | null;
      prev: number | null;
      contentHtml: string;
    }>
  >([
    {
      contentMd: localStorage.getItem(`smde_demo`) || "Initial value",
      step: 1,
      title: "",
      next: null,
      prev: null,
      contentHtml: "",
    },
  ]);
  const [title, setTitle] = useState("");

  const onChangeStepsContent = (i) => (e: string) => {
    const newArr = [...steps]; // copying the old datas array
    newArr[i].contentMd = e;
    setSteps(newArr);
  };

  const onAddStep = () => {
    const d = [...steps];
    d.forEach((l) => {
      // eslint-disable-next-line no-param-reassign
      l.next = l.step + 1;
    });
    setSteps([
      ...steps,
      {
        contentMd: "Initial value",
        step: steps.length + 1,
        title: "",
        next: null,
        prev: steps.length,
        contentHtml: "",
      },
    ]);
  };

  const onChangeStepsTitle = (i) => (e: React.FormEvent<HTMLInputElement>) => {
    const newArr = [...steps]; // copying the old datas array
    newArr[i].title = e.currentTarget.value;
    setSteps(newArr);
  };

  const { id } = useParams<ClassParams>();
  const { handleSubmit } = useForm({ mode: "onTouched" });

  const [createCourse] = useCreateCourseMutation();

  const onSubmit = handleSubmit(async () => {
    console.log(steps);
    try {
      const course = await createCourse({
        variables: {
          data: {
            steps,
            classRoom: id,
            title,
          },
        },
      });
      console.log(course);
    } catch (err) {
      console.log(err);
    }
  });
  const delay = 1000;
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay,
      },
    };
  }, [delay]);
  const addVideo = (index: number) => {
    const video = `\n <iframe id="ytplayer" type="text/html" width="100%" height="460"
      src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
      allowFullScreen={true}></iframe>`;
    const newArr = [...steps];
    newArr[index].contentMd = `${newArr[index].contentMd}${video}`;
    setSteps(newArr);
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <form onSubmit={onSubmit} className=" flex flex-col  pt-6 pb-8 mb-4">
          <div className="w-1/4 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="form-title"
            >
              Title
            </label>
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
              <button type="button" onClick={() => addVideo(i)}>
                add video
              </button>
              <div className="grid grid-cols-2 gap-4" id="markdown">
                <SimpleMdeReact
                  id="markdown"
                  value={step.contentMd}
                  onChange={onChangeStepsContent(i)}
                  options={anOptions}
                />
                <MarkdownView
                  className="bg-gray-800"
                  key={step.step}
                  markdown={step.contentMd}
                  options={{
                    tables: true,
                    emoji: true,
                    extensions: [showdownHighlight],
                  }}
                />
              </div>
              <hr className="w-full" />
            </div>
          ))}
          <button
            type="submit"
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
          >
            submit
          </button>
        </form>
        <button
          onClick={onAddStep}
          type="button"
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
        >
          add another step
        </button>
      </div>
    </>
  );
};
