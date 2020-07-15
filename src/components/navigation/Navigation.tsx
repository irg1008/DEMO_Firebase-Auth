import React, { useState, useEffect, useRef } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";

// Styled-Components.
import styled from "styled-components";
import {
  colors,
  shadows,
  media,
  ContainerStyled,
  mainTransition,
} from "../../style/main_style";

// Sign Out Button.
import { SignOutButton } from ".";

// Routes
import { ROUTES } from "../../routes";

// Logo
import Logo from "../logo";

// Authentication
import { useFirebase } from "../firebase";

// Hamburger
import { HamburgerThreeDYReverse as HamburgerIcon } from "react-animated-burgers";

/**
 * Navigation component.
 *
 * @param {INavigationProps} {
 *   authContext,
 * }
 * @returns
 */
const Navigation: React.FC = () => {
  // Username width
  const [userWidth, setUserWidth] = useState(0);

  // Username DOM reference.
  const usernameRef = useRef<HTMLDivElement>(null);

  // Username
  const { authUser } = useFirebase().state;

  // On username set => Record with.
  useEffect(() => {
    if (usernameRef.current)
      setUserWidth(usernameRef.current.children[0].scrollWidth);
  }, []);

  // Render username.
  const renderUsername = (
    username: string,
    userMaxWidth: number,
    unit: "px" | "%" | "em"
  ) => (
    <UsernameContainer ref={usernameRef} {...{ userMaxWidth, unit }}>
      {userWidth > userMaxWidth ? (
        <Username title={username}>{username}</Username>
      ) : (
        <Username>{username}</Username>
      )}
    </UsernameContainer>
  );

  // Ham menu is open.
  const [isActive, setIsActive] = useState(false);

  // Toggle ham menu.
  const toggleButton = () => setIsActive(!isActive);

  // Logo and hamburger.
  const LogoAndHamburger = (
    <NavMain>
      <NavLogo onClick={() => setIsActive(false)}>
        <Link to={ROUTES.LANDING.path}>
          <Logo />
        </Link>
      </NavLogo>
      <NavHamIcon
        buttonWidth={30}
        barColor={colors.darkBrown}
        {...{ isActive, toggleButton }}
      />
    </NavMain>
  );

  // Links
  const Links = (
    <>
      <ListItem onClick={toggleButton}>
        <NavLink to={ROUTES.LOG_IN.path}>Inicia Sesión</NavLink>
      </ListItem>
      <ListItem onClick={toggleButton}>
        <NavLink to={ROUTES.SIGN_UP.path}>Únete</NavLink>
      </ListItem>
    </>
  );

  return (
    <NavbarContainer>
      <Navbar>
        {LogoAndHamburger}
        <List isActive={isActive}>
          <ListItem onClick={toggleButton}>
            <NavLink exact to={ROUTES.LANDING.path}>
              Home
            </NavLink>
          </ListItem>
          {authUser && authUser.displayName ? (
            <>
              <ListItem>
                <SignOutButton />
              </ListItem>
              {renderUsername(authUser.displayName, 140, "px")}
            </>
          ) : (
            Links
          )}
        </List>
      </Navbar>
      <NavbarBackground isActive={isActive} onClick={toggleButton} />
    </NavbarContainer>
  );
};

export default Navigation;

// Styled-Components
// Navbar conatiner
const NavbarContainer = styled.div`
  width: auto;
  height: auto;
`;

// Navbar background
const NavbarBackground = styled.div<{ isActive: boolean }>`
  width: 100vw;
  height: 100vh;
  /* z-index */
  z-index: 1;
  /* Position */
  position: fixed;
  /* Filter */
  -webkit-backdrop-filter: blur(0.5rem);
  backdrop-filter: blur(0.5rem);
  /* BG */
  background-color: rgba(20, 20, 20, 0.8);
  /* Pointer-Events */
  pointer-events: ${(props) => (props.isActive ? "default" : "none")};
  /* Cursor */
  cursor: ${(props) => props.isActive && "pointer"};
  /* Opacity */
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  /* Transition */
  transition: ${mainTransition};
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    /* Display */
    display: none;
  }
`;

// Navbar container.
const Navbar = styled.nav`
  width: 100%;
  height: auto;
  /* z-index */
  z-index: 2;
  /* BG */
  background-color: ${colors.mainWhite};
  /* Position */
  position: fixed;
  /* Margin, Padding, Border */
  padding: 0 3em;
  /* Flexbox */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Shadow */
  -moz-box-shadow: ${shadows.hardShadow};
  -webkit-box-shadow: ${shadows.hardShadow};
  box-shadow: ${shadows.hardShadow};
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Flexbox */
    flex-direction: column;
    /* Margin, Padding, Border */
    padding: 0 2em;
  }
`;

// Main navbar space
const NavMain = styled(ContainerStyled)`
  min-height: 5em;
  /* Flexbox */
  flex-direction: row;
  justify-content: space-between;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 100%;
  }
`;

// Logo container
const NavLogo = styled.div`
  width: 15em;
  min-width: 12em;
  /* Margin, Padding, Border */
  margin-right: 2em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 12em;
  }
`;

// Ham icon
const NavHamIcon = styled(HamburgerIcon)`
  width: auto;
  height: 18px;
  /* Outline */
  outline: none;
  /* Margin, Padding, Border */
  margin: 0;
  padding: 0;
  /* Media medium size */
  @media (min-width: ${media.mediumSize}) {
    /* Display */
    display: none;
  }
`;

// Navigation list.
const List = styled.ul<{ isActive: boolean }>`
  /* Flexbox */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* List-Style */
  list-style: none;
  /* Margin, Padding, Border */
  padding: 0;
  margin: 0;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    width: 100%;
    height: ${(props) => (props.isActive ? "18em" : "0")};
    /* Overflow */
    overflow: hidden;
    /* Flexbox */
    flex-direction: column;
    justify-content: center;
    /* Opacity */
    opacity: ${(props) => (props.isActive ? 1 : 0)};
    /* Transition */
    transition: ${mainTransition};
  }
`;

// Navigation list item.
const ListItem = styled.li`
  /* Margin, Padding, Border */
  padding: 0 1em;
  /* Media medium size */
  @media (max-width: ${media.mediumSize}) {
    /* Margin, Padding, Border */
    padding: 1.5em 0;
  }
`;

// Navigation link.
const NavLink = styled(RouterNavLink)`
  /* Font */
  text-decoration: none;
  font-size: 1em;
  text-transform: uppercase;
  color: ${colors.mainBlack};
  font-weight: 700;
  /* After */
  &:after {
    height: 3px;
    width: 0;
    /* Font */
    color: ${colors.mainBlack};
    /* Content */
    content: "";
    /* Display */
    display: block;
    /* Margin, Padding, Border */
    margin: auto;
    margin-top: 4px;
    border-radius: 10em;
    /* Transition */
    transition: width 0.4s ease, background-color 0.4s ease;
  }
  /* Hover, After */
  &:hover:after {
    width: 50%;
    /* BG */
    background: ${colors.mainBlack};
  }
  /* Active, After */
  &.active:after {
    width: 100%;
    /* BG */
    background: ${colors.mainBlack};
  }
`;

// Username container
const UsernameContainer = styled.div<{ userMaxWidth: number; unit: string }>`
  max-width: ${({ userMaxWidth, unit }) => `${userMaxWidth}${unit}`};
`;

// Username
const Username = styled.div`
  width: 100%;
  /* Overflow */
  overflow: hidden;
  /* White-Space */
  white-space: nowrap;
  /* Margin, Padding, Border */
  padding: 1em 0;
  margin: 0;
  /* Font */
  text-overflow: ellipsis;
`;
