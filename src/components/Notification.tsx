/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { SingleNotification } from "./SingleNotification";

export const Notification = ({
  notifications,
}: {
  notifications;
}): JSX.Element => {
  return (
    <>
      {notifications.length &&
        notifications.map((notification) => (
          <SingleNotification
            notification={notification}
            key={notification._id}
          />
        ))}
      {!notifications.length && (
        <div className="bg-white rounded-lg overflow-hidden mb-1 p-6 text-center  text-gray-800">
          No Comments
        </div>
      )}
    </>
  );
};
