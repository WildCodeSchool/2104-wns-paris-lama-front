/* eslint-disable import/named */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/svg/logo.svg";
import { ToggleButton } from "./Buttons/ToggleButton";
import { Title } from "../Title";
import { useScreenDimensions } from "../../hooks/useScreenDimensions";
import userContext from "../../store/userContext";

type TypeProps = {
  open: boolean;
};

export const NavBar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { mobile } = useScreenDimensions();
  const { user, updateUser } = useContext(userContext);

  const contentList = [
    { text: "Home", link: "/" },
    { text: "Login", link: "/login", loggedIn: user && !!user.accessToken },
    { text: "SignUp", link: "/register", loggedIn: user && !!user.accessToken },
    // { text: "LogOut", link: "/", loggedIn: user.accessToken },
  ];

  return (
    <>
      <MenuWrapper>
        <NavTitle>LAMA</NavTitle>
        {!mobile && (
          <>
            <NavDesktop>
              <ListWrapper>
                {contentList.map(
                  ({ text, link, loggedIn }) =>
                    !loggedIn && (
                      <Link
                        to={link}
                        key={Date.now() + Math.random() * 100}
                        className="link"
                      >
                        <Title text={text} />
                      </Link>
                    )
                )}
                {user && user.accessToken && (
                  <Link
                    to="/"
                    key={Date.now() + Math.random() * 100}
                    className="link"
                    onClick={() => {
                      localStorage.removeItem("user");
                      updateUser(null);
                    }}
                  >
                    <Title text="LogOut" />
                  </Link>
                )}
              </ListWrapper>
            </NavDesktop>
          </>
        )}
        {mobile && <ToggleButton open={open} setOpen={setOpen} />}
      </MenuWrapper>
      {mobile && (
        <MenuContent open={open}>
          {contentList.map(
            ({ text, link, loggedIn }) =>
              !loggedIn && (
                <Link
                  to={link}
                  key={Date.now() + Math.random() * 100}
                  className="link"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <Title text={text} />
                </Link>
              )
          )}
        </MenuContent>
      )}
    </>
  );
};

const MenuWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
`;

const NavDesktop = styled.div`
  display: flex;
  align-items: center;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const NavTitle = styled.h1`
  font-family: "Racing Sans One", sans-serif;
  font-size: 3em;
  margin: 0;
  // position: absolute;
  // inset: 0;
  // display: flex;
  // justify-content: center;
`;

const MenuContent = styled.div<TypeProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 80px 0 0 0;
  inset: 0;
  background-color: white;
  transition: transform 0.7s ease;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  z-index: 1000;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const Link = styled.a`
//   color: inherit;
//   text-decoration: none;
//   margin-bottom: 20px;
//   @media (min-width: 800px) {
//     margin-right: 50px;
//     :last-child {
//       margin-right: 0;
//     }
//   }
// `;

const H1 = styled.h1`
  font-family: "Racing Sans One", sans-serif;
  font-size: 13px;
  margin: 0;
`;
