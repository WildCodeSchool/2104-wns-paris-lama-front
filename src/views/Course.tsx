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
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto    bg-gray-900 mb-10">
        <div className="flex flex-col justify-center items-center w-full">
          <div className=" py-3 px-5 rounded-3xl w-10/12">
            <div id="markdown">
              {currentstep ? (
                <MarkdownView
                  markdown={currentstep.contentMd}
                  options={{
                    tables: true,
                    emoji: true,
                    extensions: [showdownHighlight({ pre: true })],
                  }}
                />
              ) : (
                "not exist"
              )}
            </div>
          </div>
        </div>
      </div>
      <Steps
        stepNumberNext={next?.step.toString()}
        stepTitleNext={next?.title}
        stepNumberPrev={prev?.step.toString()}
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
