import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

export const Navbar = (): JSX.Element => {
  const [onClickAnim, setOnClickAnim] = useState(false);

  const handleToggle = () => {
    setOnClickAnim(!onClickAnim);
  };

  return (
    <>
      <Nav activAnim={onClickAnim}>
        <LogoContent>
          <img src={logo} alt="logo" width="50px" height="50px" />
          <Menu onClick={handleToggle} />
        </LogoContent>
        <MenuContent>
          <ul>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Home</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">About</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Truc</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Muche</a>
            </li>
          </ul>
        </MenuContent>
      </Nav>
    </>
  );
};

interface INav {
  activAnim: boolean;
}

const Nav = styled.nav<INav>`
  height: ${(props) => (props.activAnim ? "100vh" : "50px")};
  color: black;
  background-color: #cbddd1;
  overflow: hidden;
  z-index: 2;
  position: relative;
  transition: height 300ms ease-in-out;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.5);
  padding: 0 0 5px 5px;
`;

const LogoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
`;

const Menu = styled.div`
  width: 25px;
  height: 25px;
  background-color: black;
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-weight: 800;
  color: #555;
  position: absolute;
  overflow: hidden;
  width: 100%;
  ul {
    text-align: center;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  ul li {
    padding: 10px;
  }
  ul a {
    text-decoration: none;
    color: #555;
  }
  ul a:hover {
    color: red;
  }
`;
