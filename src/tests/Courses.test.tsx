import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor, within } from "@testing-library/react";

import { Courses, GET_ONE_COURSE_BY_ID } from "../components/Courses";

const GET_COURSE_SUCCESS_MOCK = {
  request: {
    query: GET_ONE_COURSE_BY_ID,
    variables: {
      id: "1",
    },
  },
  result: {
    data: {
      getOneCourse: {
        id: "1",
        title: "testTitle",
      },
    },
  },
};

const GET_COURSE_ERROR_MOCK = {
  request: {
    query: GET_ONE_COURSE_BY_ID,
  },
  error: new Error("Unable to reach server."),
};

describe("Courses", () => {
  describe("while fetching courses", () => {
    it("renders loading", () => {
      render(
        <MockedProvider mocks={[GET_COURSE_SUCCESS_MOCK]} addTypename={false}>
          <Courses />
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
  describe("when unable to reach server", () => {
    it("renders error", async () => {
      render(
        <MockedProvider mocks={[GET_COURSE_ERROR_MOCK]} addTypename={false}>
          <Courses />
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );

      const errorMessage = await waitFor(() => screen.getByText("Error :("));

      expect(errorMessage).toBeInTheDocument();
    });
  });
  describe("when fetching courses succeeded", () => {
    it("renders courses", async () => {
      render(
        <MockedProvider mocks={[GET_COURSE_SUCCESS_MOCK]} addTypename={false}>
          <Courses />
        </MockedProvider>,
        { wrapper: MemoryRouter }
      );

      const heading = await waitFor(() => screen.getByTestId("titleCourse"));
      expect(heading).toContain("testTitle");
    });
  });
});
