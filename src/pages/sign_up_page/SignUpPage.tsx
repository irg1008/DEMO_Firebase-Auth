import React from "react";

// SignUpForm
import SignUpForm from "./components/SignUpForm";

// SignUpLink
import SignUpLink from "./components/SignUpLink";

// Styled-Components
import styled from "styled-components";
import { MainBGContainerStyled } from "../../style/style";

// Titles
import * as Titles from "../../components/titles/Titles";

/**
 * SignUpPage component.
 */
const SignUpPage = () => (
  <SignUpContainerStyled>
    <Titles.Title1 title="Regístrate"></Titles.Title1>
    <SignUpForm />
  </SignUpContainerStyled>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };

/* Styled-Components */
// Sign Up Page container, inherits from main container with background.
const SignUpContainerStyled = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
  /* Flexbox */
  justify-content: flex-start;
`;
