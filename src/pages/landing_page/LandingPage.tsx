import React from "react";

// Styled-Components
import styled from "styled-components";
import { MainBGContainerStyled, ContainerStyled } from "../../style/style";

// Logo
import Logo from "../../components/logo/Logo";

// En Construccion
import EnConstruccion from "./components/EnConstruccion";

/**
 * Landing Page.
 *
 * @returns Main page.
 */
const LandingPage = () => {
  return (
    <LandingPageContainerStyled>
      <LandingLogoContainerStyled>
        <Logo />
      </LandingLogoContainerStyled>
      <EnConstruccion />
    </LandingPageContainerStyled>
  );
};

export default LandingPage;

/* Styled-Components */
// Landing Page Container, inherits from main container with background.
const LandingPageContainerStyled = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
`;

// MainPage logo
const LandingLogoContainerStyled = styled(ContainerStyled)`
  width: 70%;
`;
