/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React from "react";
import { useHistory, useParams } from "react-router-dom";
import MarkdownView from "react-showdown";
import showdownHighlight from "showdown-highlight";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGetOneCourseQuery } from "../graphql/generated/graphql";
import { Steps } from "../components/stepper";

type ClassParams = {
  course_id: string;
  step: string;
  class_id: string;
};
export const Course = (): JSX.Element => {
  const history = useHistory();
  const { course_id, step, class_id } = useParams<ClassParams>();

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

    document.querySelectorAll("pre").forEach((el) => {
      el.childNodes.length === 1 && el.appendChild(div);
    });
  });
  const { loading, error, data } = useGetOneCourseQuery({
    variables: { id: course_id },
  });

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const currentstep = data.getOneCourse.steps.find(
    (obj) => obj.step.toString() === step
  );
  const next = currentstep?.next
    ? data.getOneCourse.steps.find((obj) => obj.step === currentstep.next)
    : null;
  const prev = currentstep?.prev
    ? data.getOneCourse.steps.find((obj) => obj.step === currentstep.prev)
    : null;

  return (
    <>
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto    bg-gray-900 mb-28">
        <div className="flex flex-col justify-center items-center w-full">
          <div className=" py-3 px-5 rounded-3xl w-10/12">
            <div id="markdown">
              {currentstep ? (
                <ReactMarkdown
                  children={currentstep.contentMd}
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
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
              ) : (
                // <MarkdownView
                //   markdown={currentstep.contentMd}
                //   options={{
                //     tables: true,
                //     emoji: true,
                //     extensions: [showdownHighlight({ pre: true })],
                //   }}
                // />
                "not exist"
              )}
            </div>
          </div>
        </div>
      </div>
      <Steps
        stepNumberNext={next?.step.toString()}
        stepTitleNext={next?.title}
        stepTitlePrev={prev?.title}
        currentStep={currentstep?.step ? currentstep?.step.toString() : "1"}
        stepsCount={data.getOneCourse.steps.length.toString()}
        onDone={`/class-room/${class_id}`}
        onRestart={`/class-room/${class_id}/course/${course_id}/${1}`}
        onPrevClick={() => {
          prev?.step
            ? history.push(
                `/class-room/${class_id}/course/${course_id}/${prev?.step}`
              )
            : undefined;
          window.scrollTo(0, 0);
        }}
        onNextClick={() => {
          next?.step &&
            history.push(
              `/class-room/${class_id}/course/${course_id}/${next?.step}`
            );
          window.scrollTo(0, 0);
        }}
      />
    </>
  );
};
