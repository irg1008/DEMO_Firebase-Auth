import React, { useState } from "react";
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
import ROUTES from "../../routes";

// Logo
import Logo from "../logo";

// Authentication
import { withAuth } from "../auth";

// Hamburger
import { HamburgerThreeDYReverse as HamburgerIcon } from "react-animated-burgers";

// Type of Navigation.
type INavigationProps = {
  /**
   * Auth context props.
   *
   * @type {*}
   */
  authContext: {
    user: any;
  };
};

/**
 * Navigation component.
 *
 * @param {INavigationProps} {
 *   authContext,
 * }
 * @returns
 */
const Navigation: React.FC<INavigationProps> = ({
  authContext,
}: INavigationProps) => {
  // Ham menu is open.
  const [isActive, setIsOpen] = useState(false);

  // Toggle ham menu.
  const toggleButton = () => setIsOpen(!isActive);

  return (
    <NavbarContainer>
      <Navbar>
        <NavMain>
          <NavLogo onClick={() => setIsOpen(false)}>
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
        <List isActive={isActive}>
          <ListItem onClick={toggleButton}>
            <NavLink exact to={ROUTES.LANDING.path}>
              Home
            </NavLink>
          </ListItem>
          {authContext.user /*&& authContext.user.emailVerified*/ ? (
            <>
              <ListItem>
                <SignOutButton />
              </ListItem>
              {authContext.user.displayName}
            </>
          ) : (
            <>
              <ListItem onClick={toggleButton}>
                <NavLink to={ROUTES.LOG_IN.path}>Log In</NavLink>
              </ListItem>
              <ListItem onClick={toggleButton}>
                <NavLink to={ROUTES.SIGN_UP.path}>Sign Up</NavLink>
              </ListItem>
            </>
          )}
        </List>
      </Navbar>
      <NavbarBackground isActive={isActive} onClick={toggleButton} />
    </NavbarContainer>
  );
};

export default withAuth(Navigation);

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
  background-color: ${colors.mainGrey};
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
