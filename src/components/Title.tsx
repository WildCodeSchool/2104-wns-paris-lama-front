import React from "react";
import styled from "styled-components";

type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps): JSX.Element => (
  <TitleContent>
    <span>{text}</span>
    <Underline />
  </TitleContent>
);

const TitleContent = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 80px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const Underline = styled.div`
  width: 80px;
  height: 3px;
  background-color: #e04f4f;
  border-radius: 30px;
  margin-top: 5px;
`;
