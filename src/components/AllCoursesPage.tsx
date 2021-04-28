import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_ALL_COURSES = gql`
  {
    getCorses {
      id
      title
      categories
      createdAt
    }
  }
`;

export const AllCoursesPage = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_ALL_COURSES);

  type Courses = {
    id: string;
    title: string;
    categories: string;
    createdAt: string;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const reverseTable = [...data.getCorses].reverse();

  return (
    <CardContainer>
      {reverseTable.map(({ id, title, categories, createdAt }: Courses) => (
        <Link key={id} to={`/${categories}/${id}`}>
          <Card>
            <h1>{title}</h1>
            <span>{categories}</span>
            <p>{createdAt}</p>
          </Card>
        </Link>
      ))}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 5px;
  grid-template-areas: ". .";
  margin: 0 10px;
  grid-auto-flow: dense;
  a {
    color: #0060b6;
    text-decoration: none;
  }
  a:hover {
    color: #00a0c6;
    text-decoration: none;
    cursor: pointer;
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: ". . . .";
  }
`;

const Card = styled.div`
  border: 1px solid black;
`;
