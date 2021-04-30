import React from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { RouteComponentProps, useParams } from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { CommentaryType } from "./CommentaryType";
import img from "../assets/arrow.svg";
import timer from "../assets/timer.svg";

const GET_ONE_COURSE_BY_ID = gql`
  query getOneCourse($id: String!) {
    getOneCourse(id: $id) {
      id
      title
      categories
      video
      description
      link {
        title
        url
      }
      rating
    }
  }
`;

interface IId {
  categories: string;
  id: string;
}

export const Courses = (): JSX.Element => {
  const params = useParams<IId>();

  const { id } = params;
  const { loading, error, data } = useQuery(GET_ONE_COURSE_BY_ID, {
    // eslint-disable-next-line react/destructuring-assignment
    variables: { id },
  });

  const MoyenneStar = {
    size: 30,
    value: data?.getOneCourse?.rating,
    edit: false,
    isHalf: true,
  };

  type Course = {
    id: string;
    title: string;
    categories: string;
    description: string;
    video: string;
    link: { title: string; url: string };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Course>
      <Title>{data.getOneCourse.title}</Title>
      <Hr />
      <Notes>
        <ReactStars {...MoyenneStar} />
      </Notes>
      <HeaderCourse>
        <PreviousCourse>
          <h3>
            Cours
            <br />
            Précedent
          </h3>
          <LeftArrow src={img} />
        </PreviousCourse>
        <NextCourse>
          <h3>
            Cours
            <br />
            Suivant
          </h3>
          <RightArrow src={img} />
        </NextCourse>
      </HeaderCourse>
      <Video
        src={data.getOneCourse.video.replace("watch?v=", "embed/")}
        title="Youtube video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Description>
        <h2>Description</h2>
        <hr />
        <Text>
          <p>{data.getOneCourse.description}</p>
        </Text>
      </Description>
      <Documentation>
        <h2>Documentation</h2>
        <hr />
        <Doc>
          {data.getOneCourse.link.map((li: any) => (
            <a href={li.url}>
              <Card img="https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg">
                <TimerInfo>
                  <Timer src={timer} />
                  <h4>{li.title}</h4>
                </TimerInfo>
              </Card>
            </a>
          ))}
        </Doc>
      </Documentation>
      <Commentary>
        <h2>Commentaires</h2>
        <hr />
        <CommentaryType id={id} />
      </Commentary>
    </Course>
  );
};

interface IImg {
  img: string;
}

const Course = styled.div`
  background: #fbffcd;
  margin: 0;
`;
const Title = styled.h1`
  text-align: center;
  margin-top: 80px;
  padding-top: 10px;
`;
const Hr = styled.hr`
  width: 20%;
  color: #cbddd1;
`;
const HeaderCourse = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
`;
const PreviousCourse = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
    margin: 0;
  }
`;
const LeftArrow = styled.img`
  transform: rotate(-180deg);
`;
const Notes = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const NextCourse = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
    margin: 0;
  }
`;
const RightArrow = styled.img`
  width: 24px;
`;
const Video = styled.iframe`
  width: 100%;
  height: 100%;
  margin: 20px 0;
`;
const Description = styled.div`
  background-color: #474747;
  padding: 5px 0 20px;
  margin-bottom: 40px;

  h2 {
    text-align: center;
    color: #cbddd1;
  }

  hr {
    width: 20%;
    color: #cbddd1;
  }

  p {
    text-align: center;
  }
`;
const Text = styled.div`
  background-color: #cbddd1;
  padding: 20px 0;
  margin: 10px 20px;
`;
const Documentation = styled.div`
  h2 {
    text-align: center;
    color: #cbddd1;
  }

  hr {
    width: 20%;
    color: #cbddd1;
  }

  background-color: #474747;
  padding: 5px 0 20px;
  margin-bottom: 40px;
`;
const Timer = styled.img`
  width: 20px;
  height: 20px;
`;
const Doc = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div<IImg>`
  display: flex;
  justify-content: center;
  height: 200px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  margin: 10px;
  width: 200px;
`;

const TimerInfo = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;

  h4 {
    padding: 0;
    margin: 0;
  }
`;

const Commentary = styled.div`
  padding: 5px 0 20px;
  background-color: #474747;

  h2 {
    text-align: center;
    color: #cbddd1;
  }

  hr {
    width: 20%;
    color: #cbddd1;
  }
`;
