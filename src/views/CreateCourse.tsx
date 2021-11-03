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

import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
// import { Link, Redirect } from "react-router-dom";
import { SimpleMdeReact } from "react-simplemde-editor";
import MarkdownView from "react-showdown";
import showdownHighlight from "showdown-highlight";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import courseContext from "../store/course";
import {
  GetOneClassRoomQuery,
  useCreateCourseMutation,
  useGetOneClassRoomLazyQuery,
  useGetOneClassRoomQuery,
} from "../graphql/generated/graphql";

type ClassParams = {
  id: string;
};
type ICourse = {
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

  const { updateCourses } = useContext(courseContext);

  const [getQuery, { data }] = useGetOneClassRoomLazyQuery({
    variables: { id },
    onCompleted: (datassf) => console.log(datassf),
  });
  // todo update state after form submition

  const [steps, setSteps] = useState<Array<ICourse>>([
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

  const { handleSubmit } = useForm({ mode: "onTouched" });

  const [createCourse] = useCreateCourseMutation({
    onCompleted: () => getQuery(),
  });

  const onSubmit = handleSubmit(async () => {
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
      history.push(`/class-room/${id}`);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  });
  React.useEffect(() => {
    if (data && data.getOneClassRoom) {
      console.log(data);
      updateCourses(data);
    }
  }, [data, updateCourses]);
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

  React.useEffect(() => {
    // Update the document title using the browser API
    const div = document.createElement("div");
    const circle1 = document.createElement("div");
    const circle2 = document.createElement("div");
    const circle3 = document.createElement("div");
    circle1.className = `w-4  rounded-full h-4 bg-purple-400 `;
    circle2.className = `w-4  rounded-full h-4 bg-green-400 `;
    circle3.className = `w-4  rounded-full h-4 bg-red-400 `;
    div.appendChild(circle1);
    div.appendChild(circle2);
    div.appendChild(circle3);

    div.className = `flex gap-4 mb-4`;

    document.querySelectorAll(".markdown-priview > pre").forEach((el) => {
      el.childNodes.length === 1 &&
        el.children[0].hasAttribute("class") &&
        el.appendChild(div);
    });
  });

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
                <ReactMarkdown
                  key={step.step}
                  className="bg-gray-800 markdown-priview"
                  children={step.contentMd}
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                  skipHtml={false}
                  allowElement="iframe"
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          language={match[1]}
                          style={vscDarkPlus}
                          PreTag="div"
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
              <hr className="w-full" />
            </div>
          ))}
          <button
            type="submit"
            className="text-gray-200  font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn mb-5"
          >
            submit
          </button>
        </form>
        <button
          onClick={onAddStep}
          type="button"
          className="text-gray-200  font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn mb-5"
        >
          add another step
        </button>
      </div>
    </>
  );
};
