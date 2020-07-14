import React, { useEffect } from "react";

// Styled-Components
import styled from "styled-components";
import { MainBGContainerStyled, ContainerStyled } from "../../style/main_style";

// Logo
import Logo from "../../components/logo";

// En Construccion
import EnConstruccion from "./components/EnConstruccion";

/**
 * Landing Page.
 *
 * @returns Main page.
 */
const LandingPage: React.FC = () => {
  // On load change title.
  useEffect(() => {
    document.title = "Silk&Rock - Work Uniforms";
  }, []);

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
  /* Margin, Padding, Border */
  padding-top: 5em;
`;

// MainPage logo
const LandingLogoContainerStyled = styled(ContainerStyled)`
  width: 70%;
  max-width: 1000px;
`;
