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
          <p>lorem ipsum</p>
        </Text>
      </Description>
      <Documentation>
        <h2>Documentation</h2>
        <hr />
        <Doc>
          <Timer src={timer} />
          <h4>Timer</h4>
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

const Course = styled.div``;
const Title = styled.h1`
  text-align: center;
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
const Video = styled.iframe``;
const Description = styled.div`
  h2 {
    text-align: center;
  }
  hr {
    width: 10%;
  }
`;
const Text = styled.div``;
const Documentation = styled.div``;
const Timer = styled.img``;
const Doc = styled.div`
  display: flex;
  background: url("https://amana-ecoleenligne.com/wp-content/uploads/2019/02/soutien.png");
`;

const Commentary = styled.div``;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputNote = styled.input``;
const InputName = styled.input``;
const InputCommentary = styled.input``;

export default Courses;
