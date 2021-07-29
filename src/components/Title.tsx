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

const TitleContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @media (min-width: 480px) {
    width: 200px;
  }
`;

const Underline = styled.div`
  width: 100%;
  height: 3px;
  background-color: #e04f4f;
  border-radius: 30px;
`;
