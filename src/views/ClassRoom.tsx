/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useGetOneClassRoomQuery } from "../graphql/generated/graphql";
import { timeDifference } from "../utils/date";

type ClassParams = {
  id: string;
};
export const ClassRoom = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ClassParams>();

  const { loading, error, data } = useGetOneClassRoomQuery({
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error || !data) {
    console.log(error, data);
    return <p>{error && error.message}</p>;
  }
  return (
    <>
      <div className="w-11/12 mx-auto flex ">
        <div className="w-3/12 ">
          <Link
            to={`/class-room/${id}/create-course`}
            key={Date.now() + Math.random() * 100}
            className=" text-gray-200  font-bold py-4 px-8 shadow-sm focus:outline-none focus:shadow-outline btn"
          >
            Create new course
            <svg
              className="ml-3 inline"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#fff"
            >
              <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-3 w-9/12 mx-auto gap-4  justify-center items-center">
          {data.getOneClassRoom.course.map((c) => (
            <div
              className="bg-gray-800 p-6 hover:scale-x-125 col-span-1 rounded-lg shadow-lg cursor-pointer"
              key={c._id}
              onClick={() =>
                history.push(`/class-room/${id}/course/${c._id}/1`)
              }
            >
              <div className="flex items-baseline justify-between">
                <span className=" bg-green-200 text-green-800  text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>
                <div className=" text-gray-200 text-xs   font-semibold tracking-wider">
                  {timeDifference(new Date(c.updatedAt).getTime())}
                </div>
              </div>

              <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                {c.title}
              </h4>

              <div className="mt-1">
                {c.steps.length}
                <span className="text-gray-200 text-sm">
                  {" "}
                  {c.steps.length > 1 ? "parts" : "part"}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-green-600  text-sm font-semibold">
                  {c.rating} ratings{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
