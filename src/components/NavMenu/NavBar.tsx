/* eslint-disable no-console */
/* eslint-disable import/named */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
    { text: "Log in", link: "/login", loggedIn: !user?.accessToken },
    { text: "SignUp", link: "/register", loggedIn: !user?.accessToken },
    { text: "Log out", link: "/", loggedIn: !!user?.accessToken },
  ];

  return (
    <div className="mb-10 shadow-2xl  bg-gray-900">
      <MenuWrapper className=" w-11/12 mx-auto ">
        <NavTitle>LAMA</NavTitle>
        {!mobile && (
          <>
            <NavDesktop>
              <ListWrapper>
                {contentList.map(
                  ({ text, link, loggedIn }) =>
                    loggedIn && (
                      <Link
                        to={link}
                        onClick={
                          text === "Log out"
                            ? () => {
                                localStorage.removeItem("user");
                                updateUser(null);
                              }
                            : () => console.log("redirect")
                        }
                        key={Date.now() + Math.random() * 100}
                        className="link"
                      >
                        <Title text={text} />
                      </Link>
                    )
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
    </div>
  );
};

const MenuWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-family: "IBM Plex Sans", sans-serif !important;
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
