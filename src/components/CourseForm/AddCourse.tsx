import React, { useReducer } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { courseFormReducer, initialState } from "./courseFormReducer";

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

const AddCourse = (): JSX.Element => {
  const [createCourse] = useMutation(ADD_NEW_COURSE);
  const [inputFields, setInputFields] = useReducer(
    courseFormReducer,
    initialState
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createCourse({
        variables: {
          data: {
            title: inputFields.title,
            video: inputFields.video,
            categories: inputFields.categories,
            description: inputFields.description,
            link: Object.values(inputFields.doc),
          },
        },
        // eslint-disable-next-line no-console
      }).then(() => console.log("Envoyer"));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setInputFields({
      type: "reset",
    });
  };

  const handleAddField = () => {
    setInputFields({
      type: "addField",
      doc: {
        linkTitle: "",
        linkUrl: "",
        imgUrl: "",
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInputFields({
      type: "addContent",
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoc = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInputFields({
      type: "addDoc",
      index,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <NewCourse>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleAddField}>AddField</button>
      <form onSubmit={handleSubmit}>
        <NewCourseForm>
          <Input>
            <label htmlFor="title">
              Titre :
              <input
                id="title"
                name="title"
                value={inputFields?.title}
                onChange={handleChange}
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="video">
              Lien vidéo :
              <input
                id="video"
                name="video"
                value={inputFields?.video}
                onChange={handleChange}
              />
            </label>
          </Input>
          {Object.values(inputFields?.doc || {}).map(
            (el, index: number): JSX.Element => (
              <>
                <Input>
                  <label htmlFor="title-documentation">
                    Titre documentation {`${index + 1}`} :
                    <input
                      id="title-documentation"
                      name="linkTitle"
                      value={el?.linkTitle}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
                <Input>
                  <label htmlFor="link-documentation">
                    Lien documentation {`${index + 1}`}:
                    <input
                      id="link-documentation"
                      name="linkUrl"
                      value={el?.linkUrl}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
                <Input>
                  <label htmlFor="link-documentation">
                    Lien Image de la documentation {`${index + 1}`}:
                    <input
                      id="link-documentation"
                      name="imgUrl"
                      value={el?.imgUrl}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
              </>
            )
          )}
          <Input>
            <label htmlFor="categories">
              Catégorie :
              <input
                id="categories"
                name="categories"
                value={inputFields?.categories}
                onChange={handleChange}
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="description">
              Description :
              <input
                id="description"
                name="description"
                value={inputFields?.description}
                onChange={handleChange}
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
