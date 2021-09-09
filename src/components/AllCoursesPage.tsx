import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetCoursesQuery } from "../graphql/generated/graphql";

export const AllCoursesPage = (): JSX.Element => {
  const { loading, error, data } = useGetCoursesQuery();

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <CardContainer>
        <TitleContent>
          <Title>Tout les cours</Title>
          <p>
            Envie de revoir les cours de votre Formateur ?<br />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            C'est par ici que ça se passe ...
          </p>
        </TitleContent>
        {data.getCourses.map(
          (
            { _id, title, categories, description, createdAt },
            index: number
          ) => (
            <Link key={_id} to={`/${categories}/${_id}`}>
              <Card index={index}>
                <h1>{title}</h1>
                <Description>{description}</Description>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <CardInfo>
                  <span>{categories}</span>
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </CardInfo>
              </Card>
            </Link>
          )
        )}
      </CardContainer>
    </>
  );
};

interface ICard {
  index: number;
}

const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 20px;
  }
  @media (min-width: 700px) {
    h1 {
      font-size: 50px;
    }
    p {
      font-size: 30px;
    }
    grid-column: span 2;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin: 0 10px;
  font-family: sans-serif;
  font-size: 16px;
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
    text-decoration: none;
  }
  p {
    margin: 0 10px;
    text-align: justify;
  }
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: ". .";
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: ". . . .";
  }
`;

const Title = styled.h1`
  width: 100%;
  margin: 0;
  font-size: 2em;
`;

const Card = styled.div<ICard>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 300px;
  background-color: rgba(203, 221, 209, 0.75);
  border-radius: 5px;
  transition: all 0.3s ease-out;
  border: 1px solid grey;
  padding-top: 10px;
  line-height: 1.5em;

  :before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "${(props) => props.index + 1}";
    position: absolute;
    background-color: rgba(147, 160, 151, 0.75);
    width: 40px;
    height: 20px;
    top: -1px;
    border-radius: 5px 0 5px 0;
  }

  :hover {
    border: 1px solid #fcc98a;
  }

  h1 {
    font-size: 24px;
    font-family: "Belleza Regular", sans-serif;
    text-align: center;
    margin-bottom: 0;
  }
`;

const CardInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: rgba(147, 160, 151, 0.75);
  border-radius: 0 0 5px 5px;

  span {
    margin: 0 5px;
  }
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
