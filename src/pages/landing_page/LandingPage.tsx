import React from "react";

// React helment head mannager.
import { Helmet } from "react-helmet";

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
const LandingPage: React.FC = () => (
  <>
    <Helmet>
      <title>{"Silk&Rock - Work Uniforms"}</title>
      <meta
        name="description"
        content="En Silk&Rock nos dedicamos a uniformar a las mejores marcas alrededor de todo el mundo. Uniformes de trabajo que harán brillante la experiencia.
      Cuidamos hasta los pequeños detalles para que tus clientes sientan la verdadera experiencia."
      />
    </Helmet>
    <LandingPageContainer>
      <LandingLogoContainer>
        <Logo />
      </LandingLogoContainer>
      <Social />
    </LandingPageContainer>
  </>
);

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
