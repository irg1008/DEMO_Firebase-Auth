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

// Routes.
import { ROUTES } from "../../routes";

// Logo.
import Logo from "../logo";

// Firebase context.
import { useFirebase } from "../../context/firebase";

// Hamburger animated icon.
import { HamburgerThreeDYReverse as HamburgerIcon } from "react-animated-burgers";

/**
 * Navigation component.
 *
 * @returns
 */
const Navigation: React.FC = () => {
  // Username width.
  const [userWidth, setUserWidth] = useState(0);

  // Username DOM reference.
  const usernameRef = useRef<HTMLDivElement>(null);

  // Auth user.
  const { authUser } = useFirebase().state;

  // Previous vertical scroll position.
  const prevScrollY = useRef(window.scrollY);

  // Show navbar.
  const [showNav, setShowNav] = useState(true);

  // Ham menu is open.
  const [isActive, setIsActive] = useState(false);

  // On user scrolls.
  useEffect(() => {
    /**
     * When users scrolls => Update setShowNav.
     *
     */
    const handleScroll = () => {
      // Get the current scroll position.
      const currentScrollY = window.scrollY;

      // Distance for the nav to hide.
      const slideToHide = 800;

      // Distance for the nav to show.
      const slideToShow = 20;

      // Update previous scroll to current.
      const updateScroll = () => {
        prevScrollY.current = currentScrollY;
      };

      // Current position is greater or equal than previous + the distance to hide => Hide navbar and update scroll position.
      if (currentScrollY >= prevScrollY.current + slideToHide) {
        // Hide navbar.
        setShowNav(false);

        // Update scroll position.
        updateScroll();
      }

      // Current position is lesser or equal than previous - distance to show => Show navbar and update scroll position.
      else if (currentScrollY <= prevScrollY.current - slideToShow) {
        // Show navbar.
        setShowNav(true);

        // Update scroll position.
        updateScroll();
      }
    };

    // On mount => Set scroll listener.
    window.addEventListener("scroll", handleScroll, { passive: true });

    // If the username is referenced, set the username width to thw width of the child.
    // i.e.: Username container has 140px, but child occupies 250px. We save this 250px and compare it later to the 140px to overflow text if needed.
    if (usernameRef.current)
      setUserWidth(usernameRef.current.children[0].scrollWidth);

    // On component dismount => Remove scroll listener.
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showNav]);

  // When menu is open => Always show.
  useEffect(() => setShowNav(true), [isActive]);

  // Toggle ham menu.
  const toggleButton = () => setIsActive(!isActive);

  /**
   * Render username.
   *
   * @param {string} username
   * @param {number} userMaxWidth
   * @param {("px" | "%" | "em")} unit
   */
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

  // Links.
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

  // User exists.
  const UserExists = (
    <>
      <ListItem>
        <SignOutButton />
      </ListItem>
      {authUser && authUser.displayName ? (
        renderUsername(authUser.displayName, 140, "px")
      ) : (
        <NavLink to={ROUTES.COMPLETE_SIGN.path}>Completar nombre</NavLink>
      )}
    </>
  );

  return (
    <NavbarContainer>
      <Navbar show={showNav || isActive}>
        {LogoAndHamburger}
        <List {...{ isActive }}>
          <ListItem onClick={toggleButton}>
            <NavLink exact to={ROUTES.LANDING.path}>
              Home
            </NavLink>
          </ListItem>
          {authUser ? UserExists : Links}
        </List>
      </Navbar>
      <NavbarBackground {...{ isActive }} onClick={toggleButton} />
    </NavbarContainer>
  );
};

export default Navigation;

// Navbar conatiner.
const NavbarContainer = styled.div`
  width: auto;
  height: auto;
  /* Z-index */
  z-index: 100;
`;

// Navbar background.
const NavbarBackground = styled.div<{ isActive: boolean }>`
  width: 100vw;
  height: 100vh;
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
const Navbar = styled.nav<{ show: boolean }>`
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
    /* Transform */
    transform: ${(props) =>
      props.show ? "translateY(0)" : "translateY(-100%)"};
    /* Transition */
    transition: transform ease-out 0.5s;
  }
`;

// Main navbar space.
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

// Logo container.
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

// Ham icon.
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

// Username container.
const UsernameContainer = styled.div<{ userMaxWidth: number; unit: string }>`
  max-width: ${({ userMaxWidth, unit }) => `${userMaxWidth}${unit}`};
`;

// Username.
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
