import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const ADD_NEW_COURSE = gql`
  mutation createCourse($data: CourseInput!) {
    createCourse(data: $data) {
      title
      video
      categories
      description
      link {
        title
        url
      }
    }
  }
`;

const AddCourse = () => {
  let title: any;
  let video: any;
  let categories: any;
  let description: any;
  let link_title: any;
  let link_url: any;
  const [createCourse] = useMutation(ADD_NEW_COURSE);

  return (
    <NewCourse>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCourse({
            variables: {
              data: {
                title: title.value,
                video: video.value,
                categories: categories.value,
                description: description.value,
                link: [{ title: link_title.value, url: link_url.value }],
              },
            },
          });
          title.value = "";
          video.value = "";
          categories.value = "";
          description.value = "";
          link_title.value = "";
          link_url.value = "";
        }}
      >
        <NewCourseForm>
          <Input>
            <label htmlFor="title">
              Titre :
              <input
                ref={(node) => {
                  title = node;
                }}
                id="title"
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="video">
              Lien vidéo :
              <input
                ref={(node) => {
                  video = node;
                }}
                id="video"
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="title-documentation">
              Titre documentation :
              <input
                ref={(node) => {
                  link_title = node;
                }}
                id="title-documentation"
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="link-documentation">
              Lien documentation :
              <input
                ref={(node) => {
                  link_url = node;
                }}
                id="link-documentation"
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="categories">
              Catégorie :
              <input
                ref={(node) => {
                  categories = node;
                }}
                id="categories"
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="description">
              Description :
              <input
                ref={(node) => {
                  description = node;
                }}
                id="description"
              />
            </label>
          </Input>
          <button type="submit">Create course</button>
        </NewCourseForm>
      </form>
    </NewCourse>
  );
};
const NewCourse = styled.div`
  padding: 5px 0 20px;
  background-color: #474747;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h2 {
    text-align: center;
    color: #cbddd1;
  }

  hr {
    width: 20%;
    color: #cbddd1;
  }
`;

const NewCourseForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default AddCourse;
