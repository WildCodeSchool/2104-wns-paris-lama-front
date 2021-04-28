import React from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import img from "../assets/arrow.svg";
import timer from "../assets/timer.svg";

interface test {
  autofocus: string;
}

const Courses = () => {
  return (
    <Course>
      <Title>Titre du cours</Title>
      <HeaderCourse>
        <PreviousCourse>
          <h3>
            Cours
            <br />
            Précedent
          </h3>
          <LeftArrow src={img} />
        </PreviousCourse>
        <Notes />
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
          <InputNote>
            <ReactStars
              count={5}
              size={30}
              isHalf
              emptyIcon={<i className="far fa-star" />}
              halfIcon={<i className="fa fa-star-half-alt" />}
              fullIcon={<i className="fa fa-star" />}
              activeColor="#ffd700"
            />{" "}
          </InputNote>
          <InputName />
          <InputCommentary autofocus="false" />
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
const Notes = styled.div``;
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
  margin: 10px 20px;
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
  margin: 10px 30px;
`;
const InputNote = styled.div`
  display: flex;
  justify-content: center;
`;
const InputName = styled.input`
  border: none;
  border-bottom: black solid 2px;
  background-color: #fbffcd;
  height: 50px;
  margin: 10px 0;
  font-size: 20px;
  :focus {
    outline: none;
  }
`;
const InputCommentary = styled.textarea<test>`
  border: none;
  border-bottom: black solid 2px;
  background-color: #fbffcd;
  height: 200px;
  margin: 10px 0;
  font-size: 20px;
  resize: none;
  :focus {
    outline: none;
  }
`;

export default Courses;