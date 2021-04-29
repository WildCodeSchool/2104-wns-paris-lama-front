import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_NEW_COURSE = gql`
  mutation createCourse($data: CourseInput!) {
    createCourse(data: $data) {
      title
      video
      categories
      description
    }
  }
`;

const AddCourse = () => {
  let title: any;
  let video: any;
  let categories: any;
  let description: any;
  const [createCourse] = useMutation(ADD_NEW_COURSE);

  return (
    <div>
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
              },
            },
          });
          // title.value = "";
          // video.value = "";
          // categories.value = "";
          // description.value = "";
        }}
      >
        <label htmlFor="title">
          Titre :
          <input
            ref={(node) => {
              title = node;
            }}
            id="title"
          />
        </label>
        <label htmlFor="video">
          Lien vidéo :
          <input
            ref={(node) => {
              video = node;
            }}
            id="video"
          />
        </label>
        <label htmlFor="categories">
          Catégorie :
          <input
            ref={(node) => {
              categories = node;
            }}
            id="categories"
          />
        </label>
        <label htmlFor="description">
          Description :
          <input
            ref={(node) => {
              description = node;
            }}
            id="description"
          />
        </label>
        <button type="submit">Create course</button>
      </form>
    </div>
  );
};

/* <label htmlFor="title">
  Titre
  <input type="text" />
</label>
<label htmlFor="video">
  Lien Vidéo
  <input type="text" />
</label>
<label htmlFor="description">
  description
  <textarea />
</label>
<input type="submit" value="Send" /> */

export default AddCourse;
