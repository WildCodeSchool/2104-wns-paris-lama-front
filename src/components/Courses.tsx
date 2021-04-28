import React from "react";
import styled from "styled-components";
import img from "../assets/arrow.svg";
import timer from "../assets/timer.svg";

const Courses = () => {
  return (
    <Course>
      <Title>Titre du cours</Title>
      <HeaderCourse>
        <PreviousCourse>
          <h3>
            Previous
            <br />
            Course
          </h3>
          <LeftArrow src={img} />
        </PreviousCourse>
        <Notes />
        <NextCourse>
          <h3>
            Next
            <br />
            Course
          </h3>
          <RightArrow src={img} />
        </NextCourse>
      </HeaderCourse>
      <Video
        src="https://www.youtube.com/embed/Ij7C2mjstt0"
        title="Youtube video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Description>
        <h2>Description</h2>
        <hr />
        <Text>
          <p>
            lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum
          </p>
        </Text>
      </Description>
      <Documentation>
        <h2>Documentation</h2>
        <hr />
        <Doc>
          <Card>
            <TimerInfo>
              <Timer src={timer} />
              <h4>Timer</h4>
            </TimerInfo>
          </Card>
          <Card>
            <TimerInfo>
              <Timer src={timer} />
              <h4>Timer</h4>
            </TimerInfo>
          </Card>
        </Doc>
      </Documentation>
      <Commentary>
        <h2>Commentaires</h2>
        <hr />
        <Inputs>
          <InputNote />
          <InputName />
          <InputCommentary />
        </Inputs>
      </Commentary>
    </Course>
  );
};

const Course = styled.div`
  background: #cbddd1;
  margin: 0;
`;
const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  padding-top: 10px;
`;
const HeaderCourse = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PreviousCourse = styled.div`
  h3 {
    text-align: center;
  }
`;
const LeftArrow = styled.img`
  transform: rotate(-180deg);
`;
const Notes = styled.div``;
const NextCourse = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h3 {
    text-align: center;
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
    color: #fbffcd;
  }
  hr {
    width: 20%;
    color: #fbffcd;
  }
  p {
    text-align: center;
  }
`;
const Text = styled.div`
  background-color: #fbffcd;
  padding: 20px 0;
  margin: 0 20px;
`;
const Documentation = styled.div`
  h2 {
    text-align: center;
    color: #fbffcd;
  }
  hr {
    width: 20%;
    color: #fbffcd;
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

const Card = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
  background-color: blue;
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
    color: #fbffcd;
  }
  hr {
    width: 20%;
    color: #fbffcd;
  }
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const InputNote = styled.input``;
const InputName = styled.input`
  border: none;
  border-bottom: black solid 2px;
  background-color: #fbffcd;
  height: 50px;
`;
const InputCommentary = styled.input``;

export default Courses;
