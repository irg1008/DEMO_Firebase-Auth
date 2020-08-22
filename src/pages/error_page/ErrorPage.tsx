import React from "react";
import { Link } from "react-router-dom";

// React helment head mannager.
import { Helmet } from "react-helmet";

// Error.
import { Error } from "./components";

// Styled-Components.
import styled from "styled-components";
import { MainBGContainerStyled, HoverableButton } from "../../style/main_style";

// ROUTES.
import { ROUTES } from "../../routes";

/**
 * Error page component.
 *
 * @returns Error page.
 */
const ErrorPage: React.FC = () => {
  // Error type.
  const errorType = 404;

  // Error msg.
  const errorMessage = (
    <Link to={ROUTES.LANDING.path}>
      <HoverableButton>Me he perdido</HoverableButton>
    </Link>
  );

  return (
    <>
      <Helmet>
        <title>{"Silk&Rock - Error"}</title>
      </Helmet>
      <ErrorPageContainer>
        <Error {...{ errorType, errorMessage }} />
      </ErrorPageContainer>
    </>
  );
};

export default ErrorPage;

// Error page container.
const ErrorPageContainer = styled(MainBGContainerStyled)`
  min-width: 100vw;
  width: auto;
  min-height: 100vh;
  height: auto;
  /* Margin, Padding, Border */
  padding-top: 5em;
`;
