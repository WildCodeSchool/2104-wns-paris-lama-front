import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";

const COMMENTARY_CREATE = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      id
      name
      content
      rate
      course
    }
  }
`;

interface TextArea {
  autofocus: string;
}

interface NameUserInput {
  placeholder: string;
}

export const CommentaryType = (): JSX.Element => {
  let name: any;
  let content: any;
  let rate: any;
  const course = "608a6b89a774f6cde63f8912";

  const [isMount, setIsMount] = useState(false);
  const [createComment] = useMutation(COMMENTARY_CREATE);

  useEffect(() => {}, [isMount]);

  return (
    <Inputs>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createComment({
            variables: {
              data: {
                name: name.value,
                content: content.value,
                rate,
                course,
              },
            },
          });
          name.value = "";
          setIsMount(true);
        }}
      >
        <InputNote>
          <ReactStars
            count={5}
            size={30}
            isHalf
            a11y
            emptyIcon={<i className="far fa-star" />}
            halfIcon={<i className="fa fa-star-half-alt" />}
            fullIcon={<i className="fa fa-star" />}
            color="#cbddd1"
            activeColor="gold"
            onChange={(newValue: any) => {
              rate = newValue.toString();
            }}
          />{" "}
        </InputNote>
        <InputName
          placeholder="Nom"
          id="name"
          ref={(node) => {
            name = node;
          }}
        />
        <InputCommentary
          ref={(node) => {
            content = node;
          }}
          autofocus="false"
          placeholder="Commentaire..."
          id="content"
        />
        <button type="submit">Envoyer</button>
      </form>
    </Inputs>
  );
};

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
`;
const InputNote = styled.div`
  display: flex;
  justify-content: center;
`;
const InputName = styled.input<NameUserInput>`
  border: none;
  border-bottom: black solid 2px;
  background-color: #cbddd1;
  height: 50px;
  margin: 10px 0;
  font-size: 20px;

  :focus {
    outline: none;
  }
`;
const InputCommentary = styled.textarea<TextArea>`
  border: none;
  border-bottom: black solid 2px;
  background-color: #cbddd1;
  height: 200px;
  margin: 10px 0;
  font-size: 20px;
  resize: none;

  :focus {
    outline: none;
  }
`;
