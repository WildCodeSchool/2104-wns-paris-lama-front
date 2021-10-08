import React from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useCreateCommentMutation } from "../graphql/generated/graphql";

interface TextArea {
  autofocus: string;
}

interface NameUserInput {
  placeholder: string;
  autofocus: string;
}

export const CommentaryType = ({ id }: { id: string }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let name: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let content: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rate: any;
  const course = id;

  const [createComment] = useCreateCommentMutation();

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
          content.value = "";
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          autofocus="false"
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
