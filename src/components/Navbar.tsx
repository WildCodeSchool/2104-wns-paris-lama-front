import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import logoMenu from "../assets/images/Logo-Menu.svg";

export const Navbar = (): JSX.Element => {
  const [onClickAnim, setOnClickAnim] = useState(false);

  return (
    <>
      <Nav activAnim={onClickAnim}>
        <LogoContent>
          <a href="/">
            <img src={logo} alt="logo" width="50px" height="50px" />
          </a>
          <Menu
            activAnim={onClickAnim}
            onClick={() => setOnClickAnim(!onClickAnim)}
          />
        </LogoContent>
        <MenuContent>
          <ul>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="/">Accueil</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="/cours">Cours</a>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Ajouter un cour</a>
            </li>
          </ul>
          <img src={logoMenu} alt="logo" width="100%" height="80%" />
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
  position: absolute;
  z-index: 10;
  top: 0;
  width: 100%;
  transition: height 300ms ease-in-out;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.5);
  padding: 0 0 5px 0;
  font-family: "Belleza Regular", sans-serif;
  @media (min-width: 700px) {
    display: flex;
    align-items: center;
    height: 100px;
    position: initial;
  }
`;

const LogoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  @media (min-width: 700px) {
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const Menu = styled.div<INav>`
  ${(props) => props.activAnim && `transform: rotate(-180deg)`};
  transition: all 0.3s ease-out;
  width: 25px;
  height: 25px;
  background-color: #fbffcd;
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
  @media (min-width: 700px) {
    display: none;
  }
`;

const MenuContent = styled.div`
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
  img {
    margin-top: 10%;
  }
  @media (min-width: 700px) {
    position: initial;
    ul {
      display: flex;
      justify-content: flex-end;
    }
    img {
      display: none;
    }
  }
`;
