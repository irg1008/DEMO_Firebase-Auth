import React, { useEffect } from "react";

// Styled-Components.
import styled from "styled-components";
import { MainBGContainerStyled, ContainerStyled } from "../../style/main_style";

// Logo.
import Logo from "../../components/logo";

// Social.
import Social from "../../components/social";

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
    <LandingPageContainer>
      <LandingLogoContainer>
        <Logo />
      </LandingLogoContainer>
      <Social />
    </LandingPageContainer>
  );
};

export default LandingPage;

// Landing page container.
const LandingPageContainer = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
  /* Margin, Padding, Border */
  padding-top: 10em;
  padding-bottom: 2em;
`;

// Logo container.
const LandingLogoContainer = styled(ContainerStyled)`
  width: 70%;
  max-width: 1000px;
`;
